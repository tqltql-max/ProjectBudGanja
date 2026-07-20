'use strict';

function rowToPost(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    growId: row.grow_id || '',
    entryId: row.entry_id || '',
    photoUrl: row.photo_url || '',
    caption: row.caption || '',
    phase: row.phase || '',
    helpRequest: !!row.help_request,
    kind: row.kind || 'diary',
    status: row.status || 'published',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    authorName: row.author_name || '',
    authorUsername: row.author_username || '',
    authorPicture: row.author_picture || '',
    commentCount: row.comment_count != null ? Number(row.comment_count) : 0
  };
}

function rowToComment(row) {
  if (!row) return null;
  return {
    id: row.id,
    postId: row.post_id,
    userId: row.user_id,
    body: row.body || '',
    status: row.status || 'published',
    createdAt: row.created_at,
    authorName: row.author_name || '',
    authorUsername: row.author_username || '',
    authorPicture: row.author_picture || ''
  };
}

async function insertCommunityPost(db, post) {
  await db.execute({
    sql: `INSERT INTO community_posts
      (id, user_id, grow_id, entry_id, photo_url, caption, phase, help_request, kind, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      post.id,
      post.userId,
      post.growId || '',
      post.entryId || '',
      post.photoUrl || '',
      post.caption || '',
      post.phase || '',
      post.helpRequest ? 1 : 0,
      post.kind || 'diary',
      post.status || 'published',
      post.createdAt,
      post.updatedAt
    ]
  });
}

async function findCommunityPostByEntryPhoto(db, entryId, photoUrl) {
  const result = await db.execute({
    sql: `SELECT p.*, u.name AS author_name, u.username AS author_username, u.picture AS author_picture
          FROM community_posts p
          LEFT JOIN users u ON u.id = p.user_id
          WHERE p.entry_id = ? AND p.photo_url = ?
          LIMIT 1`,
    args: [entryId, photoUrl]
  });
  return rowToPost(result.rows[0]);
}

async function getCommunityPostById(db, id) {
  const result = await db.execute({
    sql: `SELECT p.*, u.name AS author_name, u.username AS author_username, u.picture AS author_picture,
            (SELECT COUNT(*) FROM community_comments c
             WHERE c.post_id = p.id AND c.status = 'published') AS comment_count
          FROM community_posts p
          LEFT JOIN users u ON u.id = p.user_id
          WHERE p.id = ?
          LIMIT 1`,
    args: [id]
  });
  return rowToPost(result.rows[0]);
}

async function listCommunityFeed(db, options) {
  const limit = Math.min(Math.max(Number(options.limit) || 20, 1), 50);
  const cursor = String(options.cursor || '').trim();
  const kind = String(options.kind || '').trim();
  const args = [];
  let sql = `SELECT p.*, u.name AS author_name, u.username AS author_username, u.picture AS author_picture,
      (SELECT COUNT(*) FROM community_comments c
       WHERE c.post_id = p.id AND c.status = 'published') AS comment_count
    FROM community_posts p
    LEFT JOIN users u ON u.id = p.user_id
    WHERE p.status = 'published'`;
  if (kind === 'diary' || kind === 'plant_id') {
    sql += ' AND p.kind = ?';
    args.push(kind);
  }
  if (cursor) {
    sql += ' AND p.created_at < ?';
    args.push(cursor);
  }
  sql += ' ORDER BY p.created_at DESC LIMIT ?';
  args.push(limit + 1);
  const result = await db.execute({ sql, args });
  const rows = result.rows.map(rowToPost);
  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore && items.length ? items[items.length - 1].createdAt : null;
  return { items, nextCursor };
}

async function listCommunityPostsByUser(db, userId) {
  const result = await db.execute({
    sql: `SELECT id, entry_id, photo_url, status, created_at
          FROM community_posts
          WHERE user_id = ? AND status = 'published'
          ORDER BY created_at DESC
          LIMIT 200`,
    args: [userId]
  });
  return result.rows.map((row) => ({
    id: row.id,
    entryId: row.entry_id || '',
    photoUrl: row.photo_url || '',
    status: row.status,
    createdAt: row.created_at
  }));
}

async function listCommunityPostsAdmin(db, limit) {
  const n = Math.min(Math.max(Number(limit) || 50, 1), 100);
  const result = await db.execute({
    sql: `SELECT p.*, u.name AS author_name, u.username AS author_username, u.picture AS author_picture,
            (SELECT COUNT(*) FROM community_comments c WHERE c.post_id = p.id) AS comment_count
          FROM community_posts p
          LEFT JOIN users u ON u.id = p.user_id
          ORDER BY p.created_at DESC
          LIMIT ?`,
    args: [n]
  });
  return result.rows.map(rowToPost);
}

async function setCommunityPostStatus(db, id, status) {
  const now = new Date().toISOString();
  await db.execute({
    sql: 'UPDATE community_posts SET status = ?, updated_at = ? WHERE id = ?',
    args: [status, now, id]
  });
}

async function insertCommunityComment(db, comment) {
  await db.execute({
    sql: `INSERT INTO community_comments (id, post_id, user_id, body, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      comment.id,
      comment.postId,
      comment.userId,
      comment.body || '',
      comment.status || 'published',
      comment.createdAt
    ]
  });
}

async function listCommunityComments(db, postId) {
  const result = await db.execute({
    sql: `SELECT c.*, u.name AS author_name, u.username AS author_username, u.picture AS author_picture
          FROM community_comments c
          LEFT JOIN users u ON u.id = c.user_id
          WHERE c.post_id = ? AND c.status = 'published'
          ORDER BY c.created_at ASC
          LIMIT 200`,
    args: [postId]
  });
  return result.rows.map(rowToComment);
}

async function getCommunityCommentById(db, id) {
  const result = await db.execute({
    sql: `SELECT c.*, u.name AS author_name, u.username AS author_username, u.picture AS author_picture
          FROM community_comments c
          LEFT JOIN users u ON u.id = c.user_id
          WHERE c.id = ?
          LIMIT 1`,
    args: [id]
  });
  return rowToComment(result.rows[0]);
}

async function setCommunityCommentStatus(db, id, status) {
  await db.execute({
    sql: 'UPDATE community_comments SET status = ? WHERE id = ?',
    args: [status, id]
  });
}

module.exports = {
  insertCommunityPost,
  findCommunityPostByEntryPhoto,
  getCommunityPostById,
  listCommunityFeed,
  listCommunityPostsByUser,
  listCommunityPostsAdmin,
  setCommunityPostStatus,
  insertCommunityComment,
  listCommunityComments,
  getCommunityCommentById,
  setCommunityCommentStatus
};
