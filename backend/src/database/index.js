const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      // Usa o process.cwd() para garantir que o arquivo seja criado na raiz do projeto
      const dbPath = path.join(process.cwd(), 'database.sqlite');
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  async initialize() {
    // Cria a tabela de usuários
    await this.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      nome TEXT
    )`);

    // Cria a tabela de histórico
    await this.run(`CREATE TABLE IF NOT EXISTS users_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      videoId TEXT,
      ultimaVisualizacao TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    )`);

    // Cria a tabela de vídeos
    await this.run(`CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      videoId TEXT UNIQUE,
      titulo TEXT,
      duracao TEXT,
      views INTEGER
    )`);
  }

  async seed() {
    
      await this.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        nome TEXT
      )`);

    await this.run(`INSERT OR IGNORE INTO users (id, nome) VALUES (?, ?)`, ['1', 'User 1']);
    await this.run(`INSERT OR IGNORE INTO users (id, nome) VALUES (?, ?)`, ['2', 'User 2']);
    await this.run(`INSERT OR IGNORE INTO users (id, nome) VALUES (?, ?)`, ['3', 'User 3']);

    // Insere vídeos
    await this.run(
      `INSERT OR IGNORE INTO videos (videoId, titulo, duracao, views) VALUES (?, ?, ?, ?)`,
      ['101', 'Stranger Things - Piloto', '45 minutos', 0]
    );
    await this.run(
      `INSERT OR IGNORE INTO videos (videoId, titulo, duracao, views) VALUES (?, ?, ?, ?)`,
      ['102', 'Breaking Bad - Piloto', '60 minutos', 0]
    );

    // Insere histórico para o usuário "1"
    const now = new Date().toISOString();
    await this.run(
      `INSERT OR IGNORE INTO users_history (userId, videoId, ultimaVisualizacao) VALUES (?, ?, ?)`,
      ['1', '101', now]
    );
    await this.run(
      `INSERT OR IGNORE INTO users_history (userId, videoId, ultimaVisualizacao) VALUES (?, ?, ?)`,
      ['1', '102', now]
    );
  }
}

module.exports = new Database();
