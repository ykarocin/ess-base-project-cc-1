const { loadFeature, defineFeature } = require('jest-cucumber');
const VideoService = require('../../src/services/video.service');
const db = require('../../src/database');

const feature = loadFeature('tests/features/tests-service-video.feature');

defineFeature(feature, (test) => {
  let serviceResult;
  let errorCaught;

  beforeAll(async () => {
    await db.connect();
    await db.initialize();
    await db.seed();
  });

  test('Return video by videoId', ({ given, when, then }) => {
    given(
      'o método getVideo do VideoService retorna um vídeo com videoId "101", título "Stranger Things - Piloto" e duração "45 minutos"',
      () => {
      }
    );
    when('o método getVideo do VideoService for chamado com o id "101"', async () => {
      try {
        serviceResult = await new VideoService().getVideo('101');
      } catch (err) {
        errorCaught = err;
      }
    });
    then('o vídeo retornado deve ter videoId "101", título "Stranger Things - Piloto" e duração "45 minutos"', () => {
      if (errorCaught) throw errorCaught;
      expect(serviceResult.data.videoId).toBe('101');
      expect(serviceResult.data.titulo).toBe('Stranger Things - Piloto');
      expect(serviceResult.data.duracao).toBe('45 minutos');
    });
  });
});
