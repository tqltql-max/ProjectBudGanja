'use strict';

const net = require('net');
const tls = require('tls');

function createLineReader(socket) {
  let buffer = '';
  const waiters = [];

  function flush() {
    let idx;
    while ((idx = buffer.indexOf('\r\n')) !== -1) {
      const line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      const waiter = waiters.shift();
      if (waiter) waiter.resolve(line);
    }
  }

  socket.on('data', (chunk) => {
    buffer += chunk.toString();
    flush();
  });

  socket.on('error', (err) => {
    while (waiters.length) waiters.shift().reject(err);
  });

  socket.on('close', () => {
    const err = new Error('SMTP: ligação fechada');
    while (waiters.length) waiters.shift().reject(err);
  });

  return {
    readLine() {
      const idx = buffer.indexOf('\r\n');
      if (idx !== -1) {
        const line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        return Promise.resolve(line);
      }
      return new Promise((resolve, reject) => {
        waiters.push({ resolve, reject });
      });
    },
    write(line) {
      socket.write(line + '\r\n');
    }
  };
}

async function readMultiline(reader) {
  const lines = [];
  let line = await reader.readLine();
  lines.push(line);
  while (line.length >= 4 && line[3] === '-') {
    line = await reader.readLine();
    lines.push(line);
  }
  const code = parseInt(lines[0].slice(0, 3), 10);
  if (code >= 400) throw new Error('SMTP: ' + lines.join(' | '));
  return lines;
}

async function expectCode(reader, code) {
  const lines = await readMultiline(reader);
  if (!lines[0].startsWith(String(code))) {
    throw new Error('SMTP: esperado ' + code + ', recebido ' + lines[0]);
  }
  return lines;
}

async function sendSmtpMail(opts) {
  const host = opts.host || 'smtp.gmail.com';
  const port = Number(opts.port || 587);
  const user = String(opts.user || '');
  const pass = String(opts.pass || '');
  const from = String(opts.from || user);
  const to = String(opts.to || '');
  const subject = String(opts.subject || '');
  const text = String(opts.text || '');

  if (!user || !pass || !to) {
    throw new Error('SMTP: credenciais ou destinatário em falta');
  }

  return new Promise((resolve, reject) => {
    const socket = net.connect(port, host, async () => {
      try {
        const reader = createLineReader(socket);
        await expectCode(reader, 220);
        reader.write('EHLO budganja.local');
        await readMultiline(reader);
        reader.write('STARTTLS');
        await expectCode(reader, 220);

        const tlsSocket = tls.connect({ socket, servername: host }, async () => {
          try {
            const tlsReader = createLineReader(tlsSocket);
            tlsReader.write('EHLO budganja.local');
            await readMultiline(tlsReader);

            const b64 = (s) => Buffer.from(s, 'utf8').toString('base64');
            tlsReader.write('AUTH LOGIN');
            await expectCode(tlsReader, 334);
            tlsReader.write(b64(user));
            await expectCode(tlsReader, 334);
            tlsReader.write(b64(pass));
            await expectCode(tlsReader, 235);

            tlsReader.write('MAIL FROM:<' + from + '>');
            await expectCode(tlsReader, 250);
            tlsReader.write('RCPT TO:<' + to + '>');
            await expectCode(tlsReader, 250);
            tlsReader.write('DATA');
            await expectCode(tlsReader, 354);

            const msg = [
              'From: ' + from,
              'To: ' + to,
              'Subject: ' + subject,
              'MIME-Version: 1.0',
              'Content-Type: text/plain; charset=UTF-8',
              '',
              text
            ].join('\r\n');
            tlsSocket.write(msg + '\r\n.\r\n');
            await expectCode(tlsReader, 250);
            tlsReader.write('QUIT');
            tlsSocket.end();
            resolve();
          } catch (e) {
            tlsSocket.destroy();
            reject(e);
          }
        });
        tlsSocket.on('error', reject);
      } catch (e) {
        socket.destroy();
        reject(e);
      }
    });
    socket.on('error', reject);
  });
}

module.exports = { sendSmtpMail };
