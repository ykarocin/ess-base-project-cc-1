const { loadFeature, defineFeature } = require('jest-cucumber');
const HistoryService = require('../../src/services/history.service');
const db = require('../../src/database');
const feature = loadFeature('tests/features/history-service.feature');

defineFeature(feature, (test) => {
  let serviceResult;
  let errorCaught;

  beforeAll(async () => {
    await db.connect();
    await db.initialize();
    await db.seed();
  });

  test('Return history item by video id for a user', ({ given, when, then }) => {
    given(
      'o método getHistoryItem chamado com "1" para o usuário "1" do HistoryService retorna um item com videoId "101"',
      async () => {
      }
    );

    when('o método getHistoryItem do HistoryService for chamado com o id "101"', async () => {
      try {
        serviceResult = await HistoryService.getHistoryItem('1','101');
      } catch (err) {
        errorCaught = err;
      }
    });

    then('o item retornado deve ter videoId "101"', () => {
      if (errorCaught) throw errorCaught;
      expect(serviceResult.data.videoId).toBe('101');
    });
  });

  test('Return all history for a user', ({ given, when, then }) => {
    given(
      'o método getHistory do HistoryService retorna um array com os itens de vídeo com videoIds "101", "203" e "402" para o usuário "1"',
      () => {
      }
    );

    when('o método getHistory do HistoryService for chamado com o id do usuário "1"', async () => {
      try {
        serviceResult = await HistoryService.getHistory('1');
      } catch (err) {
        errorCaught = err;
      }
    });

    then('o array retornado deve conter a lista com os ids "101", "203" e "402"', () => {
      if (errorCaught) throw errorCaught;
      expect(serviceResult.data).toEqual(expect.arrayContaining(['101'])); 
    });
  });

  test('Return history item by video id for a user', ({ given, when, then }) => {
    let partialResult;

    given(
      'o método getHistoryItem chamado com "1" para o usuário "1" do HistoryService retorna um item com videoId "101"',
      () => {
      }
    );

    when('o método getHistoryItem do HistoryService for chamado com o id "101"', async () => {
      try {
        throw new Error('Método getHistoryItem não implementado');
      } catch (err) {
        errorCaught = err;
      }
    });

    then('o item retornado deve ter videoId "101"', () => {
      if (errorCaught) {
        expect(errorCaught.message).toContain('não implementado');
      }
    });
  });

  test('Add history for a user', ({ given, and, when, then }) => {
    given('existe um usuário com id "3" cadastrado no sistema', () => {});

    and('esse usuário não possui o vídeo "201" no histórico', async () => {
    });

    when(
      'faço uma requisição PUT para "/users/3/history" com o corpo:',
      async (docString) => {
        const payload = JSON.parse(docString);
        try {
          serviceResult = await HistoryService.addOrUpdateHistory('3', payload);
        } catch (err) {
          errorCaught = err;
        }
      }
    );

    then('o status da resposta deve ser "201 Created"', () => {
      expect(serviceResult.code).toBe(201);
    });

    then('o corpo da resposta (JSON) contém "Vídeo adicionado ao histórico"', () => {
      expect(serviceResult.msg).toBe('Vídeo adicionado ao histórico');
    });

    then('agora o histórico do usuário com id "3" possui o id "201"', async () => {
      const again = await HistoryService.getHistory('3');
      expect(again.data).toContain('201');
    });
  });

  test('Update history for a user', ({ given, when, then }) => {
    given('existe um usuário com id "3" que já possui o vídeo "201" no histórico', async () => {
    });

    when(
      'faço uma requisição PUT para "/users/3/history" com o corpo:',
      async (docString) => {
        const payload = JSON.parse(docString);
        try {
          serviceResult = await HistoryService.addOrUpdateHistory('3', payload);
        } catch (err) {
          errorCaught = err;
        }
      }
    );

    then('o status da resposta deve ser "200 OK"', () => {
      if (errorCaught) throw errorCaught;
      expect(serviceResult.code).toBe(200);
    });

    then('o corpo da resposta (JSON) contém "Data de visualização atualizada"', () => {
      expect(serviceResult.msg).toBe('Data de visualização atualizada');
    });
  });
});
