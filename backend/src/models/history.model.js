const HistoryItemEntity = require('../entities/history.item.entity');

class HistoryModel {
  constructor(itemEntity) {
    this.userId = itemEntity.userId;
    this.videoId = itemEntity.videoId;
    this.ultimaVisualizacao = itemEntity.ultimaVisualizacao;
  }
}

module.exports = HistoryModel;
