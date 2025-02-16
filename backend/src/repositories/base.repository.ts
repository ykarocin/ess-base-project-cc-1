import Database from '../database';
import BaseEntity from '../entities/base.entity';
import { HttpInternalServerError } from '../utils/errors/http.error';
import { v4 as uuidv4 } from 'uuid';

export default class BaseRepository<T extends BaseEntity> {
  protected tableName: string;
  protected db: any;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public async init(): Promise<void> {
    const database = await Database.getInstance();
    this.db = database.db;
  }

  public async add(data: T): Promise<T> {
    try {
      const newId = uuidv4();
      data.id = newId;
      const keys = Object.keys(data);
      const placeholders = keys.map(() => '?').join(', ');
      const values = keys.map(key => (data as any)[key]);
      const sql = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
      await this.db.run(sql, values);
      return data;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao adicionar registro' });
    }
  }

  public async updateById(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const keys = Object.keys(data);
      if (keys.length === 0) return null;
      const setClause = keys.map(key => `${key} = ?`).join(', ');
      const values = keys.map(key => (data as any)[key]);
      values.push(id);
      const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
      await this.db.run(sql, values);
      const row = await this.db.get(`SELECT * FROM ${this.tableName} WHERE id = ?`, id);
      return row;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao atualizar registro' });
    }
  }

  public async findOne(query: string, params: any[]): Promise<T | null> {
    try {
      const row = await this.db.get(query, params);
      return row;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar registro' });
    }
  }

  public async findAll(query: string, params: any[] = []): Promise<T[]> {
    try {
      const rows = await this.db.all(query, params);
      return rows;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar registros' });
    }
  }
}
