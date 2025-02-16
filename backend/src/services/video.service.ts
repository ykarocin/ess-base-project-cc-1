import VideoRepository from '../repositories/video.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';
import VideoEntity from '../entities/video.entity';

export default class VideoService {
  private videoRepository: VideoRepository;

  constructor(videoRepository: VideoRepository) {
    this.videoRepository = videoRepository;
  }

  public async getVideo(videoId: string): Promise<VideoEntity> {
    const video = await this.videoRepository.getVideoByVideoId(videoId);
    if (!video) {
      throw new HttpNotFoundError({ msg: 'Vídeo não encontrado', msgCode: 'video_not_found' });
    }
    return video;
  }

  public async registerView(videoId: string, userId: string): Promise<{ message: string; videoId: string; userId: string }> {
    const video = await this.videoRepository.getVideoByVideoId(videoId);
    if (!video) {
      throw new HttpNotFoundError({ msg: 'Vídeo não encontrado', msgCode: 'video_not_found' });
    }
    await this.videoRepository.updateById(video.id, { views: video.views + 1 });
    return { message: 'Visualização registrada com sucesso', videoId: video.videoId, userId };
  }
}
