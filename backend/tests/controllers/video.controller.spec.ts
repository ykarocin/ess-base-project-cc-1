import supertest from 'supertest';
import app from '../../src/app';
import Database from '../../src/database';
import { di } from '../../src/di';
import VideoRepository from '../../src/repositories/video.repository';

describe('VideoController', () => {
  const request = supertest(app);
  let videoRepo: VideoRepository;

  beforeEach(async () => {
    await Database.reset();
    await Database.getInstance().then(db => db.seed());
    videoRepo = di.getRepository(VideoRepository);
  });

  it('should return video data for a valid video', async () => {
    const response = await request.get('/api/videos/101');
    expect(response.status).toBe(200);
    expect(response.body.videoId).toEqual('101');
    expect(response.body.titulo).toEqual('Stranger Things - Piloto');
    expect(response.body.duracao).toEqual('45 minutos');
    expect(response.body.videoLink).toEqual('https://youtube.com/watch?v=101');
  });

  it('should return 404 when video is not found', async () => {
    const response = await request.get('/api/videos/999');
    expect(response.status).toBe(404);
    expect(response.body.msgCode).toEqual('video_not_found');
  });

  it('should register a view for a video', async () => {
    const payload = { userId: '1' };
    const response = await request.post('/api/videos/101/visualizacao').send(payload);
    expect(response.status).toBe(201);
    expect(response.body.data.message).toEqual('Visualização registrada com sucesso');
    expect(response.body.data.videoId).toEqual('101');
    expect(response.body.data.userId).toEqual('1');
  });
});
