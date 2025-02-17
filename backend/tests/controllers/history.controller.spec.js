const supertest = require('supertest');
const app = require('../../src/app');
const Database = require('../../src/database');
const { di } = require('../../src/di');
const HistoryRepository = require('../../src/repositories/history.repository');

describe('HistoryController', () => {
  const request = supertest(app);
  let historyRepo;

  beforeEach(async () => {
    await Database.reset();
    const dbInstance = await Database.getInstance();
    await dbInstance.seed();
    historyRepo = di.getRepository(HistoryRepository);
  });

  it('should return history for a valid user (non-empty)', async () => {
    const response = await request.get('/api/users/1/history');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(expect.arrayContaining(['101', '102']));
  });

  it('should return empty history for a user with no history', async () => {
    const response = await request.get('/api/users/2/history');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  it('should return 404 for a non-existent user', async () => {
    const response = await request.get('/api/users/999/history');
    expect(response.status).toBe(404);
    expect(response.body.msgCode).toEqual('user_not_found');
  });

  it('should add a new history item', async () => {
    const payload = {
      videoId: '201',
      titulo: 'The Office - Episódio 3'
    };
    const response = await request.put('/api/users/3/history').send(payload);
    expect(response.status).toBe(201);
    expect(response.body.data.message).toEqual('Vídeo adicionado ao histórico');
  });

  it('should update an existing history item', async () => {
    const payload = {
      videoId: '201',
      titulo: 'The Office - Episódio 3'
    };
    await request.put('/api/users/3/history').send(payload);
    const response = await request.put('/api/users/3/history').send(payload);
    expect(response.status).toBe(200);
    expect(response.body.data.message).toEqual('Data de visualização atualizada');
  });
});
