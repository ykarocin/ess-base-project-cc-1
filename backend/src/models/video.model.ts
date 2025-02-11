import VideoEntity from '../entities/video.entity';

export default class VideoModel {
  public videoId: string;
  public titulo: string;
  public duracao: string;
  public views: number;
  public likes: number;
  public imageUrl: string;

  constructor(video: VideoEntity) {
    this.videoId = video.videoId;
    this.titulo = video.titulo;
    this.duracao = video.duracao;
    this.views = video.views;
    this.likes = video.likes;
    this.imageUrl = video.imageUrl;
  }
}
