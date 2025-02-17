const { loadFeature, defineFeature } = require('jest-cucumber');
const VideoRepository = require('../../src/repositories/video.repository');
const VideoEntity = require('../../src/entities/video.entity');
const VideoService = require('../../src/services/video.service');

const feature = loadFeature('tests/features/tests-service-video.feature');

defineFeature(feature, test => {
  let mockVideoRepository;
  let service;
  let videoReturned;
  let video;

  beforeEach(() => {
    mockVideoRepository = {
      getVideoByVideoId: jest.fn(),
      updateById: jest.fn(),
    };
    service = new VideoService(mockVideoRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Return video by videoId', ({ given, when, then }) => {
    given(
      /^o método getVideo do VideoService retorna um vídeo com videoId "(.*)", título "(.*)" e duração "(.*)"$/,
      async (videoId, titulo, duracao) => {
        video = new VideoEntity({
          videoId,
          titulo,
          duracao,
          views: 0,
          likes: 0,
          videoLink: `https://youtube.com/watch?v=${videoId}`
        });
        mockVideoRepository.getVideoByVideoId.mockResolvedValue(video);
      }
    );

    when(/^o método getVideo do VideoService for chamado com o id "(.*)"$/, async videoId => {
      videoReturned = await service.getVideo(videoId);
    });

    then(/^o vídeo retornado deve ter videoId "(.*)", título "(.*)" e duração "(.*)"$/, (videoId, titulo, duracao) => {
      expect(videoReturned.videoId).toEqual(videoId);
      expect(videoReturned.titulo).toEqual(titulo);
      expect(videoReturned.duracao).toEqual(duracao);
    });
  });
});
