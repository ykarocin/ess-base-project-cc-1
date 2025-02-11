import HistoryItemEntity from '../../src/entities/history.item.entity';
import HistoryService from '../../src/services/history.service';
import HistoryRepository from '../../src/repositories/history.repository';
import { HttpNotFoundError } from '../../src/utils/errors/http.error';

describe('HistoryService', () => {
  let mockHistoryRepository: HistoryRepository;
  let service: HistoryService;

  // Cria um item de histórico sem o campo "titulo"
  const mockHistoryItem: HistoryItemEntity = new HistoryItemEntity({
    userId: '1',
    videoId: '101',
    ultimaVisualizacao: new Date().toISOString(),
  });

  beforeEach(() => {
    mockHistoryRepository = {
      getHistoryByUserId: jest.fn(),
      getHistoryItem: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
    } as any;
    service = new HistoryService(mockHistoryRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return history for a valid user', async () => {
    (mockHistoryRepository.getHistoryByUserId as jest.Mock).mockResolvedValue([mockHistoryItem]);
    const history = await service.getHistory('1');
    expect(history).toEqual([mockHistoryItem]);
    expect(mockHistoryRepository.getHistoryByUserId).toBeCalledWith('1');
  });

  it('should throw an error for a non-existent user', async () => {
    await expect(service.getHistory('999')).rejects.toThrow(HttpNotFoundError);
  });

  it('should add a new history item if it does not exist', async () => {
    (mockHistoryRepository.getHistoryItem as jest.Mock).mockResolvedValue(null);
    (mockHistoryRepository.add as jest.Mock).mockResolvedValue(mockHistoryItem);
    (mockHistoryRepository.getHistoryByUserId as jest.Mock).mockResolvedValue([mockHistoryItem]);

    const result = await service.addOrUpdateHistory('1', { videoId: '101', titulo: 'Ignored Title' });
    expect(result.message).toEqual('Vídeo adicionado ao histórico');
    expect(mockHistoryRepository.add).toBeCalled();
  });

  it('should update an existing history item if it exists', async () => {
    (mockHistoryRepository.getHistoryItem as jest.Mock).mockResolvedValue(mockHistoryItem);
    (mockHistoryRepository.update as jest.Mock).mockResolvedValue({
      ...mockHistoryItem,
      ultimaVisualizacao: new Date().toISOString(),
    });
    (mockHistoryRepository.getHistoryByUserId as jest.Mock).mockResolvedValue([mockHistoryItem]);

    const result = await service.addOrUpdateHistory('1', { videoId: '101', titulo: 'Ignored Title' });
    expect(result.message).toEqual('Data de visualização atualizada');
    expect(mockHistoryRepository.update).toBeCalled();
  });
});
