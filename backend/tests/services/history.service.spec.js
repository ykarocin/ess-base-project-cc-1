const HistoryItemEntity = require('../../src/entities/history.item.entity');
const HistoryService = require('../../src/services/history.service');
const HistoryRepository = require('../../src/repositories/history.repository');
const { HttpNotFoundError } = require('../../src/utils/errors/http.error');

describe('HistoryService', () => {
  let mockHistoryRepository;
  let service;

  const mockHistoryItem = new HistoryItemEntity({
    userId: '1',
    videoId: '101',
    ultimaVisualizacao: new Date().toISOString(),
  });

  beforeEach(() => {
    mockHistoryRepository = {
      getHistoryByUserId: jest.fn(),
      getHistoryItem: jest.fn(),
      add: jest.fn(),
      updateById: jest.fn(),
    };
    service = new HistoryService(mockHistoryRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return history for a valid user', async () => {
    mockHistoryRepository.getHistoryByUserId.mockResolvedValue([mockHistoryItem]);
    const history = await service.getHistory('1');
    expect(history).toEqual([mockHistoryItem]);
    expect(mockHistoryRepository.getHistoryByUserId).toHaveBeenCalledWith('1');
  });

  it('should throw an error for a non-existent user', async () => {
    await expect(service.getHistory('999')).rejects.toThrow(HttpNotFoundError);
  });

  it('should add a new history item if it does not exist', async () => {
    mockHistoryRepository.getHistoryItem.mockResolvedValue(null);
    mockHistoryRepository.add.mockResolvedValue(mockHistoryItem);
    mockHistoryRepository.getHistoryByUserId.mockResolvedValue([mockHistoryItem]);

    const result = await service.addOrUpdateHistory('1', { videoId: '101', titulo: 'Ignored Title' });
    expect(result.message).toEqual('Vídeo adicionado ao histórico');
    expect(mockHistoryRepository.add).toHaveBeenCalled();
  });

  it('should update an existing history item if it exists', async () => {
    mockHistoryRepository.getHistoryItem.mockResolvedValue(mockHistoryItem);
    mockHistoryRepository.updateById.mockResolvedValue({
      ...mockHistoryItem,
      ultimaVisualizacao: new Date().toISOString(),
    });
    mockHistoryRepository.getHistoryByUserId.mockResolvedValue([mockHistoryItem]);

    const result = await service.addOrUpdateHistory('1', { videoId: '101', titulo: 'Ignored Title' });
    expect(result.message).toEqual('Data de visualização atualizada');
    expect(mockHistoryRepository.updateById).toHaveBeenCalled();
  });
});
