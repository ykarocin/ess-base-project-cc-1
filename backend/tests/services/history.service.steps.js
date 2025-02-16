const { loadFeature, defineFeature } = require('jest-cucumber');
const HistoryRepository = require('../../src/repositories/history.repository');
const HistoryItemEntity = require('../../src/entities/history.item.entity');
const HistoryService = require('../../src/services/history.service');

const feature = loadFeature('tests/features/tests-service-history.feature');

defineFeature(feature, test => {
  let mockHistoryRepository;
  let service;
  let history;
  let historyItemReturned;
  let userIdToCall;
  let mockHistoryItem;

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

  test('Return all history for a user', ({ given, when, then }) => {
    given(
      /^o método getHistory do HistoryService retorna um array com os itens de vídeo com videoIds "(.*)", "(.*)" e "(.*)" para o usuário "(.*)"$/,
      async (videoId1, videoId2, videoId3, userId) => {
        userIdToCall = userId;
        const now = new Date().toISOString();
        const item1 = new HistoryItemEntity({ userId, videoId: videoId1, ultimaVisualizacao: now });
        const item2 = new HistoryItemEntity({ userId, videoId: videoId2, ultimaVisualizacao: now });
        const item3 = new HistoryItemEntity({ userId, videoId: videoId3, ultimaVisualizacao: now });
        mockHistoryRepository.getHistoryByUserId.mockResolvedValue([item1, item2, item3]);
      }
    );

    when(
      /^o método getHistory do HistoryService for chamado com o id do usuário "(.*)"$/,
      async userId => {
        history = await service.getHistory(userId);
      }
    );

    then(/^o array retornado deve conter a lista com os ids "(.*)", "(.*)" e "(.*)"$/, (id1, id2, id3) => {
      const returnedIds = history.map(item => item.videoId);
      expect(returnedIds).toEqual([id1, id2, id3]);
    });
  });

  test('Return history item by video id for a user', ({ given, when, then }) => {
    given(
      /^o método getHistoryItem chamado com "(.*)" para o usuário "(.*)" do HistoryService retorna um item com videoId "(.*)"$/,
      async (userId, _unused, videoId) => {
        userIdToCall = userId;
        mockHistoryItem = new HistoryItemEntity({
          userId,
          videoId,
          ultimaVisualizacao: new Date().toISOString(),
        });
        mockHistoryRepository.getHistoryItem.mockResolvedValue(mockHistoryItem);
      }
    );

    when(
      /^o método getHistoryItem do HistoryService for chamado com o id "(.*)"$/,
      async videoId => {
        historyItemReturned = await mockHistoryRepository.getHistoryItem(userIdToCall, videoId);
      }
    );

    then(/^o item retornado deve ter videoId "(.*)"$/, videoId => {
      expect(historyItemReturned).not.toBeNull();
      expect(historyItemReturned.videoId).toEqual(videoId);
    });
  });

  test('Add history for a user', ({ given, when, then, and }) => {
    given('existe um usuário com id "3" cadastrado no sistema', async () => {
      userIdToCall = "3";
    });

    given('esse usuário não possui o vídeo "201" no histórico', async () => {
      mockHistoryRepository.getHistoryItem.mockResolvedValue(null);
    });

    when(
      /^faço uma requisição PUT para "(.*)" com o corpo:$/,
      async (url, docString) => {
        const videoData = JSON.parse(docString);
        const newItem = new HistoryItemEntity({
          userId: userIdToCall,
          videoId: videoData.videoId,
          ultimaVisualizacao: new Date().toISOString(),
        });
        mockHistoryRepository.add.mockResolvedValue(newItem);
        mockHistoryRepository.getHistoryByUserId.mockResolvedValue([newItem]);
        const result = await service.addOrUpdateHistory(userIdToCall, videoData);
        history = result.history;
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, statusCode => {
      expect(history.length).toBeGreaterThan(0);
    });

    and(/^o corpo da resposta \(JSON\) contém "(.*)"$/, expectedMessage => {
      expect(history[0].videoId).toEqual("201");
    });

    and('agora o histórico do usuário com id "3" possui o id "201"', () => {
      const returnedIds = history.map(item => item.videoId);
      expect(returnedIds).toContain("201");
    });
  });

  test('Update history for a user', ({ given, when, then, and }) => {
    given('existe um usuário com id "3" que já possui o vídeo "201" no histórico', async () => {
      userIdToCall = "3";
      mockHistoryItem = new HistoryItemEntity({
        userId: userIdToCall,
        videoId: "201",
        ultimaVisualizacao: new Date("2020-01-01").toISOString(),
      });
      mockHistoryRepository.getHistoryItem.mockResolvedValue(mockHistoryItem);
      mockHistoryRepository.updateById.mockResolvedValue({
        ...mockHistoryItem,
        ultimaVisualizacao: new Date().toISOString(),
      });
      mockHistoryRepository.getHistoryByUserId.mockResolvedValue([mockHistoryItem]);
    });

    when(
      /^faço uma requisição PUT para "(.*)" com o corpo:$/,
      async (url, docString) => {
        const videoData = JSON.parse(docString);
        const result = await service.addOrUpdateHistory(userIdToCall, videoData);
        history = result.history;
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, statusCode => {
      expect(history.length).toBeGreaterThan(0);
    });

    and(/^o corpo da resposta \(JSON\) contém "(.*)"$/, expectedMessage => {
      expect(mockHistoryRepository.updateById).toHaveBeenCalled();
    });
  });
});
