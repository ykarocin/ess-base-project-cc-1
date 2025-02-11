import BaseRepository from './base.repository';
import HistoryItemEntity from '../entities/history.item.entity';

export default class HistoryRepository extends BaseRepository<HistoryItemEntity> {
  constructor() {
    super('histories');
  }

  public async getHistoryByUserId(userId: string): Promise<HistoryItemEntity[]> {
    return await this.findAll(item => item.userId === userId);
  }

  public async getHistoryItem(userId: string, videoId: string): Promise<HistoryItemEntity | null> {
    return await this.findOne(item => item.userId === userId && item.videoId === videoId);
  }
}
