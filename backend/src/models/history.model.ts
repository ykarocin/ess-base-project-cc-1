import HistoryItemEntity from '../entities/history.item.entity';

export default class HistoryModel {
  public videoId: string;
  public ultimaVisualizacao: string;

  constructor(item: HistoryItemEntity) {
    this.videoId = item.videoId;
    this.ultimaVisualizacao = item.ultimaVisualizacao;
  }
}
