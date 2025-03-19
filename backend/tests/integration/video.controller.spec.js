const supertest = require('supertest');
const app = require('../../src/app');
const db = require('../../src/database');

describe('VideoController (Integration)', () => {
  beforeEach(async () => {
    await db.connect();
    await db.initialize();
    await db.seed();
  });

  it('GET /api/videos/101 - deve retornar 200 e dados do vídeo 101', async () => {
    const res = await supertest(app).get('/api/videos/101');
    expect(res.status).toBe(200);
    expect(res.body.data.videoId).toBe('101');
    expect(res.body.data.titulo).toBe('Stranger Things - Piloto');
  });

  it('GET /api/videos/999 - deve retornar 404 se vídeo não existe', async () => {
    const res = await supertest(app).get('/api/videos/999');
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe('Vídeo não encontrado');
  });

  it('POST /api/videos/101/visualizacao - deve registrar view e retornar 201', async () => {
    const payload = { userId: '1' };
    const res = await supertest(app).post('/api/videos/101/visualizacao').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.msg).toBe('Visualização registrada com sucesso');
  });
});
