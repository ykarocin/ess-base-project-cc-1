import sqlite3 from 'sqlite3';
import { open, Database as SqliteDatabase } from 'sqlite';

export default class Database {
  public db!: SqliteDatabase<sqlite3.Database, sqlite3.Statement>;
  private static instance: Database;

  private constructor() {}

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      const instance = new Database();
      instance.db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
      });
      await instance.initialize();
      Database.instance = instance;
    }
    return Database.instance;
  }

  private async initialize() {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        videoId TEXT,
        titulo TEXT,
        duracao TEXT,
        views INTEGER,
        likes INTEGER,
        videoLink TEXT
      );
      CREATE TABLE IF NOT EXISTS histories (
        id TEXT PRIMARY KEY,
        userId TEXT,
        videoId TEXT,
        ultimaVisualizacao TEXT
      );
    `);
  }

  public static async reset(): Promise<void> {
    const instance = await Database.getInstance();
    await instance.db.exec(`DROP TABLE IF EXISTS videos; DROP TABLE IF EXISTS histories;`);
    await instance.initialize();
  }

  public async seed(): Promise<void> {
    const generateUUID = (): string =>
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    // Seed para vídeos, agora com o campo videoLink (por exemplo, link do YouTube)
    await this.db.exec(`
      INSERT INTO videos (id, videoId, titulo, duracao, views, likes, videoLink) VALUES
      ('${generateUUID()}', '101', 'Stranger Things - Piloto', '45 minutos', 0, 0, 'https://youtube.com/watch?v=101'),
      ('${generateUUID()}', '102', 'Breaking Bad - Piloto', '60 minutos', 0, 0, 'https://youtube.com/watch?v=102');
    `);
    const now = new Date().toISOString();
    // Seed para histories (para o usuário "1")
    await this.db.exec(`
      INSERT INTO histories (id, userId, videoId, ultimaVisualizacao) VALUES
      ('${generateUUID()}', '1', '101', '${now}'),
      ('${generateUUID()}', '1', '102', '${now}');
    `);
  }
}
