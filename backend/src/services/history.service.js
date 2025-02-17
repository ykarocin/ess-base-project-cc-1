const HistoryRepository = require('../repositories/history.repository');
const HistoryItemEntity = require('../entities/history.item.entity');
const { HttpNotFoundError } = require('../utils/errors/http.error');

class HistoryService {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
    this.validUsers = new Set(['1', '2', '3']);
  }

  async getHistory(userId) {
    if (!this.validUsers.has(userId)) {
      throw new HttpNotFoundError({ msg: 'Usuário não encontrado', msgCode: 'user_not_found' });
    }
    return await this.historyRepository.getHistoryByUserId(userId);
  }

  async addOrUpdateHistory(userId, videoData) {
    if (!this.validUsers.has(userId)) {
      throw new HttpNotFoundError({ msg: 'Usuário não encontrado', msgCode: 'user_not_found' });
    }
    const now = new Date().toISOString();
    const existing = await this.historyRepository.getHistoryItem(userId, videoData.videoId);
    let message;
    if (existing) {
      await this.historyRepository.updateById(existing.id, { ultimaVisualizacao: now });
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

module.exports = HistoryService;
