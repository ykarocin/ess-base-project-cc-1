import BaseEntity from './base.entity';

interface IVideoProps {
  videoId: string;
  titulo: string;
  duracao: string;
  views: number;
  likes?: number;
  imageUrl?: string;
}

export default class VideoEntity extends BaseEntity {
  public videoId: string;
  public titulo: string;
  public duracao: string;
  public views: number;
  public likes: number;
  public imageUrl: string;

  constructor({ videoId, titulo, duracao, views, likes = 0, imageUrl = '' }: IVideoProps) {
    super();
    this.videoId = videoId;
    this.titulo = titulo;
    this.duracao = duracao;
    this.views = views;
    this.likes = likes;
    this.imageUrl = imageUrl;
  }
}
