import supertest from 'supertest';
import app from '../../src/app';
import Database from '../../src/database';
import { di } from '../../src/di';
import HistoryRepository from '../../src/repositories/history.repository';

describe('HistoryController', () => {
  const request = supertest(app);
  let historyRepo: HistoryRepository;

  beforeEach(async () => {
    await Database.reset();
    await Database.getInstance().then(db => db.seed());
    historyRepo = di.getRepository(HistoryRepository);
  });

  it('should return history for a valid user (non-empty)', async () => {
    const response = await request.get('/api/users/1/history');
    expect(response.status).toBe(200);
    // O GET retorna um array de videoIds (strings)
    expect(response.body).toEqual(expect.arrayContaining(['101', '102']));
  });

  it('should return empty history for a user with no history', async () => {
    const response = await request.get('/api/users/2/history');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
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
