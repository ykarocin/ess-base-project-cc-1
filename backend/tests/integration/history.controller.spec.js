const supertest = require('supertest');
const app = require('../../src/app');
const db = require('../../src/database');

describe('HistoryController (Integration)', () => {
  beforeEach(async () => {
    await db.connect();
    // Dropar tabelas para garantir ambiente limpo:
    await db.run("DROP TABLE IF EXISTS users_history");
    await db.run("DROP TABLE IF EXISTS users");
    await db.run("DROP TABLE IF EXISTS videos");
    await db.initialize();
    await db.seed();
  });

  it('GET /api/users/1/history - deve retornar 200 e [101,102]', async () => {
    const res = await supertest(app).get('/api/users/1/history');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.arrayContaining(['101', '102']));
  });

  it('GET /api/users/999/history - deve retornar 404', async () => {
    const res = await supertest(app).get('/api/users/999/history');
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe('Usuário não encontrado');
  });

  it('PUT /api/users/3/history - se novo vídeo, retorna 201', async () => {
    const payload = { videoId: `NOVO_VIDEO_${Date.now()}` };
    const res = await supertest(app).put('/api/users/3/history').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.msg).toBe('Vídeo adicionado ao histórico');
  });

  it('PUT /api/users/3/history - se já existe, retorna 200', async () => {
    const payload = { videoId: `VIDEO_EXISTENTE_${Date.now()}` };
    // Primeiro, insere o registro
    await supertest(app).put('/api/users/3/history').send(payload);
    // Em seguida, atualiza o mesmo registro
    const res = await supertest(app).put('/api/users/3/history').send(payload);
    expect(res.status).toBe(200);
    expect(res.body.msg).toBe('Data de visualização atualizada');
  });
});
