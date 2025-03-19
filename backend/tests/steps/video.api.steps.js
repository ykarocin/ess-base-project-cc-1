const { loadFeature, defineFeature } = require('jest-cucumber');
const supertest = require('supertest');
const app = require('../../src/app');

const feature = loadFeature('tests/features/video-api.feature');

defineFeature(feature, (test) => {
  let response;

  test('Obter dados de vídeo com sucesso', ({ given, and, when, then }) => {
    given('existe um vídeo com id "101" no sistema', () => { });
    and('esse vídeo tem título "Stranger Things - Piloto"', () => { });
    and('duração "45 minutos"', () => { });

    when('faço uma requisição GET para "/videos/101"', async () => {
      response = await supertest(app).get('/api/videos/101');
    });

    then('o status da resposta é "200 OK"', () => {
      expect(response.status).toBe(200);
    });

    and(`o corpo da resposta (JSON) contém:
      """
      {
        "videoId": "101",
        "titulo": "Stranger Things - Piloto",
        "duracao": "45 minutos"
      }
      """`, () => {
      expect(response.body.data.videoId).toBe('101');
      expect(response.body.data.titulo).toBe('Stranger Things - Piloto');
      expect(response.body.data.duracao).toBe('45 minutos');
    });
  });

  test('Vídeo não encontrado', ({ given, when, then }) => {
    given('não existe um vídeo com id "999"', () => {
    });

    when('faço uma requisição GET para "/videos/999"', async () => {
      response = await supertest(app).get('/api/videos/999');
    });

    then('o status da resposta é "404 Not Found"', () => {
      expect(response.status).toBe(404);
    });

    then('o corpo da resposta (JSON) indica "Vídeo não encontrado"', () => {
      expect(response.body.msg).toBe('Vídeo não encontrado');
    });
  });

  test('Registrar visualização de vídeo com sucesso', ({ given, and, when, then }) => {
    given('existe um vídeo com id "101" no sistema', () => {});
    and('existe um usuário com id "1"', () => {});

    when(
      'faço uma requisição POST para "/videos/101/visualizacao" com o corpo:',
      async (docString) => {
        const payload = JSON.parse(docString);
        response = await supertest(app)
          .post('/api/videos/101/visualizacao')
          .send(payload);
      }
    );

    then('o status da resposta é "201 Created"', () => {
      expect(response.status).toBe(201);
    });

    then(`o corpo da resposta (JSON) contém:
      """
      {
        "message": "Visualização registrada com sucesso",
        "videoId": "101",
        "userId": "1"
      }
      """`, () => {
      expect(response.body.data.message).toBe('Visualização registrada com sucesso');
      expect(response.body.data.videoId).toBe('101');
      expect(response.body.data.userId).toBe('1');
    });
  });
});
