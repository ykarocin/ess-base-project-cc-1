const HistoryService = require('../../src/services/history.service');
const { HttpNotFoundError } = require('../../src/utils/errors/http.error');
const db = require('../../src/database');

describe('HistoryService (Unit)', () => {
  let service;

  beforeEach(async () => {
    await db.connect();
    await db.run("DROP TABLE IF EXISTS users_history");
    await db.run("DROP TABLE IF EXISTS users");
    await db.run("DROP TABLE IF EXISTS videos");
    await db.initialize();
    await db.seed();
    service = new HistoryService();
  });

  it('getHistory - retorna [101,102] para user=1', async () => {
    const result = await service.getHistory('1');
    expect(result.data).toEqual(expect.arrayContaining(['101', '102']));
  });

  it('getHistory - user inexistente gera HttpNotFoundError', async () => {
    await expect(service.getHistory('999')).rejects.toThrow(HttpNotFoundError);
  });

  it('addOrUpdateHistory - user inexistente => HttpNotFoundError', async () => {
    await expect(service.addOrUpdateHistory('999', { videoId: 'ABC' }))
      .rejects.toThrow(HttpNotFoundError);
  });

  it('addOrUpdateHistory - adiciona se não existir e retorna 201 code', async () => {
    const result = await service.addOrUpdateHistory('3', { videoId: 'NOVO_VIDEO_TESTE' });
    expect(result.code).toBe(201);
    expect(result.msg).toBe('Vídeo adicionado ao histórico');
  });

  it('addOrUpdateHistory - atualiza se já existir => 200 code', async () => {
    await service.addOrUpdateHistory('3', { videoId: 'VIDEO_TESTE_EXIST' });
    const result = await service.addOrUpdateHistory('3', { videoId: 'VIDEO_TESTE_EXIST' });
    expect(result.code).toBe(200);
    expect(result.msg).toBe('Data de visualização atualizada');
  });
});
