import BaseRepository from './base.repository';
import HistoryItemEntity from '../entities/history.item.entity';
import { HttpInternalServerError } from '../utils/errors/http.error';

export default class HistoryRepository extends BaseRepository<HistoryItemEntity> {
  constructor() {
    super('histories');
  }

  public async init(): Promise<void> {
    await super.init();
  }

  public async getHistoryByUserId(userId: string): Promise<HistoryItemEntity[]> {
    try {
      const sql = `SELECT * FROM histories WHERE userId = ?`;
      const rows = await this.db.all(sql, [userId]);
      return rows;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar histórico' });
    }
  }

  public async getHistoryItem(userId: string, videoId: string): Promise<HistoryItemEntity | null> {
    try {
      const sql = `SELECT * FROM histories WHERE userId = ? AND videoId = ?`;
      const row = await this.db.get(sql, [userId, videoId]);
      return row;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar item de histórico' });
    }
  }
}
