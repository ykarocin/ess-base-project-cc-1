import supertest from 'supertest';
import app from '../../src/app';
import Database from '../../src/database';
import { di } from '../../src/di';
import HistoryRepository from '../../src/repositories/history.repository';

describe('HistoryController', () => {
  const request = supertest(app);
  let historyRepo: HistoryRepository;

  beforeEach(() => {
    // Reinicia e semeia o banco de dados antes de cada teste
    Database.reset();
    Database.seed();
    historyRepo = di.getRepository(HistoryRepository);
  });

  it('should return history for a valid user (non-empty)', async () => {
    const response = await request.get('/api/users/1/history');
    expect(response.status).toBe(200);
    // Agora o GET retorna um array de videoIds (strings)
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
      titulo: 'The Office - Episódio 3' // Mesmo que o service ignore esse campo, o payload pode vir assim.
    };
    // Agora, a rota utiliza PUT para criar/atualizar o histórico
    const response = await request.put('/api/users/3/history').send(payload);
    expect(response.status).toBe(201);
    expect(response.body.data.message).toEqual('Vídeo adicionado ao histórico');
  });

  it('should update an existing history item', async () => {
    const payload = {
      videoId: '201',
      titulo: 'The Office - Episódio 3'
    };
    // Primeiro, adiciona o item...
    await request.put('/api/users/3/history').send(payload);
    // ... e em seguida atualiza (a mesma chamada atualiza o timestamp)
    const response = await request.put('/api/users/3/history').send(payload);
    expect(response.status).toBe(200);
    expect(response.body.data.message).toEqual('Data de visualização atualizada');
  });
});
