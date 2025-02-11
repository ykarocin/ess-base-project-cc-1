import HistoryRepository from '../repositories/history.repository';
import HistoryItemEntity from '../entities/history.item.entity';
import { HttpNotFoundError } from '../utils/errors/http.error';

export default class HistoryService {
  private historyRepository: HistoryRepository;
  private validUsers: Set<string> = new Set(['1', '2', '3']);

  constructor(historyRepository: HistoryRepository) {
    this.historyRepository = historyRepository;
  }

  public async getHistory(userId: string): Promise<HistoryItemEntity[]> {
    if (!this.validUsers.has(userId)) {
      throw new HttpNotFoundError({ msg: 'Usuário não encontrado', msgCode: 'user_not_found' });
    }
    return await this.historyRepository.getHistoryByUserId(userId);
  }

  public async addOrUpdateHistory(
    userId: string,
    videoData: { videoId: string;}
  ): Promise<{ message: string; history: HistoryItemEntity[] }> {
    if (!this.validUsers.has(userId)) {
      throw new HttpNotFoundError({ msg: 'Usuário não encontrado', msgCode: 'user_not_found' });
    }
    const now = new Date().toISOString();
    const existing = await this.historyRepository.getHistoryItem(userId, videoData.videoId);
    let message: string;
    if (existing) {
      await this.historyRepository.update(
        item => item.id === existing.id,
        { ultimaVisualizacao: now }
      );
      message = 'Data de visualização atualizada';
    } else {
      const newItem = new HistoryItemEntity({
        userId,
        videoId: videoData.videoId,
        ultimaVisualizacao: now,
      });
      await this.historyRepository.add(newItem);
      message = 'Vídeo adicionado ao histórico';
    }
    const history = await this.historyRepository.getHistoryByUserId(userId);
    return { message, history };
  }
}
