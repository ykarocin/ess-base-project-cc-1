import BaseRepository from './base.repository';
import VideoEntity from '../entities/video.entity';

export default class VideoRepository extends BaseRepository<VideoEntity> {
  constructor() {
    super('videos');
  }

  public async getVideoByVideoId(videoId: string): Promise<VideoEntity | null> {
    return await this.findOne(item => item.videoId === videoId);
  }
}
