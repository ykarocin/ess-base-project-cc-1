import BaseEntity from './base.entity';

interface IHistoryItemProps {
  userId: string;
  videoId: string;
  ultimaVisualizacao: string;
}

export default class HistoryItemEntity extends BaseEntity {
  public userId: string;
  public videoId: string;
  public ultimaVisualizacao: string;

  constructor({ userId, videoId, ultimaVisualizacao }: IHistoryItemProps) {
    super();
    this.userId = userId;
    this.videoId = videoId;
    this.ultimaVisualizacao = ultimaVisualizacao;
  }
}
