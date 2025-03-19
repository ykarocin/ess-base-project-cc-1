const { loadFeature, defineFeature } = require('jest-cucumber');
const supertest = require('supertest');
const app = require('../../src/app');

const feature = loadFeature('tests/features/history-api.feature');

defineFeature(feature, (test) => {
  let response;

  test('Obter histórico com sucesso (não vazio)', ({ given, and, when, then }) => {
    given('existe um usuário com id "1" cadastrado no sistema', () => {
    });

    and('esse usuário possui os vídeos "101" e "102" no histórico', () => {
    });

    when('faço uma requisição GET para "/users/1/history"', async () => {
      response = await supertest(app).get('/api/users/1/history');
    });

    then('o status da resposta é "200 OK"', () => {
      expect(response.status).toBe(200);
    });

    and('o corpo da resposta (JSON) contém os vídeos "101" e "102"', () => {
      expect(response.body.data).toEqual(expect.arrayContaining(['101','102']));
    });
  });

  test('Obter histórico vazio', ({ given, and, when, then }) => {
    given('existe um usuário com id "2" cadastrado no sistema', () => {
    });

    and('esse usuário não possui nenhum vídeo no histórico', () => {
    });

    when('faço uma requisição GET para "/users/2/history"', async () => {
      response = await supertest(app).get('/api/users/2/history');
    });

    then('o status da resposta é "200 OK"', () => {
      expect(response.status).toBe(200);
    });

    and('o corpo da resposta (JSON) contém uma lista vazia', () => {
      expect(response.body.data).toEqual([]);
    });
  });

  test('Obter histórico de usuário inexistente', ({ given, when, then }) => {
    given('não existe um usuário com id "999" no sistema', () => {
    });

    when('faço uma requisição GET para "/users/999/history"', async () => {
      response = await supertest(app).get('/api/users/999/history');
    });

    then('o status da resposta é "404 Not Found"', () => {
      expect(response.status).toBe(404);
    });

    then('o corpo da resposta (JSON) indica "Usuário não encontrado"', () => {
      expect(response.body.msg).toBe('Usuário não encontrado');
    });
  });

  test('Adicionar vídeo ao histórico', ({ given, and, when, then }) => {
    given('existe um usuário com id "3" cadastrado no sistema', () => {
    });

    and('esse usuário não possui o vídeo "201" no histórico', () => {
    });

    when(
      'faço uma requisição PUT para "/users/3/history" com o corpo:',
      async (docString) => {
        const payload = JSON.parse(docString);
        response = await supertest(app)
          .put('/api/users/3/history')
          .send(payload);
      }
    );

    then('o status da resposta deve ser "201 Created"', () => {
      expect(response.status).toBe(201);
    });

    and('o corpo da resposta (JSON) contém "Vídeo adicionado ao histórico"', () => {
      expect(response.body.msg).toBe('Vídeo adicionado ao histórico');
    });

    and('agora o histórico do usuário com id "3" possui o vídeo "201"', async () => {
      const check = await supertest(app).get('/api/users/3/history');
      expect(check.status).toBe(200);
      expect(check.body.data).toContain('201');
    });
  });

  test('Atualizar data de visualização de um vídeo já existente', ({ given, when, then }) => {
    given('existe um usuário com id "3" que já possui o vídeo "201" no histórico', async () => {

    });

    when(
      'faço uma requisição PUT para "/users/3/history" com o corpo:',
      async (docString) => {
        const payload = JSON.parse(docString);
        response = await supertest(app)
          .put('/api/users/3/history')
          .send(payload);
      }
    );

    then('o status da resposta deve ser "200 OK"', () => {
      expect(response.status).toBe(200);
    });

    then('o corpo da resposta (JSON) contém "Data de visualização atualizada"', () => {
      expect(response.body.msg).toBe('Data de visualização atualizada');
    });
  });
});
