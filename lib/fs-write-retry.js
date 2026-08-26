'use strict';

const fs = require('fs');
const writeFileSyncNative = fs.writeFileSync.bind(fs);

function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function unlinkQuiet(file) {
  try {
    fs.unlinkSync(file);
  } catch (_) { /* ignore */ }
}

// Windows: antivírus / Explorer / outro processo pode bloquear o ficheiro no
// instante do write (UNKNOWN / EPERM / EBUSY). Retry + temp+rename.
function writeFileRetrySync(file, content, encoding) {
  const tries = 12;
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      if (encoding == null) writeFileSyncNative(file, content);
      else writeFileSyncNative(file, content, encoding);
      return;
    } catch (err) {
      lastErr = err;
      if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
        try {
          fs.chmodSync(file, 0o666);
        } catch (_) { /* ignore */ }
      }
      const tmp = file + '.write-tmp-' + process.pid;
      try {
        if (encoding == null) writeFileSyncNative(tmp, content);
        else writeFileSyncNative(tmp, content, encoding);
        try {
          fs.renameSync(tmp, file);
          return;
        } catch (renameErr) {
          lastErr = renameErr;
          try {
            fs.copyFileSync(tmp, file);
            unlinkQuiet(tmp);
            return;
          } catch (copyErr) {
            lastErr = copyErr;
            unlinkQuiet(tmp);
          }
        }
      } catch (tmpErr) {
        lastErr = tmpErr;
        unlinkQuiet(tmp);
      }
      if (i === tries - 1) break;
      const code = lastErr && lastErr.code;
      if (code === 'ENOENT' || code === 'ENOSPC' || code === 'EISDIR' || code === 'EINVAL') break;
      sleepSync(120 * (i + 1));
    }
  }
  throw lastErr;
}

module.exports = { writeFileRetrySync, sleepSync };
