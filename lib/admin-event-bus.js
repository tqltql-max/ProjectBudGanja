'use strict';

// Singleton — partilhado por toda a aplicação server-side
class AdminEventBus {
  constructor() {
    this._clients = new Set();
  }

  subscribe(res) {
    this._clients.add(res);
    res.on('close', () => this._clients.delete(res));
    res.on('error', () => this._clients.delete(res));
  }

  emit(event, data) {
    if (!this._clients.size) return;
    const msg = 'event: ' + event + '\ndata: ' + JSON.stringify(data) + '\n\n';
    for (const res of [...this._clients]) {
      try { res.write(msg); } catch (e) { this._clients.delete(res); }
    }
  }

  get clientCount() { return this._clients.size; }
}

module.exports = new AdminEventBus();
