import BaseRepository from './base.repository';
import VideoEntity from '../entities/video.entity';
import { HttpInternalServerError } from '../utils/errors/http.error';

export default class VideoRepository extends BaseRepository<VideoEntity> {
  constructor() {
    super('videos');
  }

  public async init(): Promise<void> {
    await super.init();
  }

  public async getVideoByVideoId(videoId: string): Promise<VideoEntity | null> {
    try {
      const sql = `SELECT * FROM videos WHERE videoId = ?`;
      const row = await this.db.get(sql, [videoId]);
      return row;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar vídeo' });
    }
  }
}
