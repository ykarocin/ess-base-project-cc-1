import { loadFeature, defineFeature } from 'jest-cucumber';
import VideoRepository from '../../src/repositories/video.repository';
import VideoEntity from '../../src/entities/video.entity';
import VideoService from '../../src/services/video.service';

const feature = loadFeature('tests/features/tests-service-video.feature');

defineFeature(feature, (test) => {
  let mockVideoRepository: VideoRepository;
  let service: VideoService;
  let videoReturned: VideoEntity;
  let video: VideoEntity;

  beforeEach(() => {
    mockVideoRepository = {
      getVideoByVideoId: jest.fn(),
      update: jest.fn(),
    } as any;
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
        });
        (mockVideoRepository.getVideoByVideoId as jest.Mock).mockResolvedValue(video);
      }
    );

    when(/^o método getVideo do VideoService for chamado com o id "(.*)"$/, async (videoId) => {
      videoReturned = await service.getVideo(videoId);
    });

    then(/^o vídeo retornado deve ter videoId "(.*)", título "(.*)" e duração "(.*)"$/, (videoId, titulo, duracao) => {
      expect(videoReturned.videoId).toEqual(videoId);
      expect(videoReturned.titulo).toEqual(titulo);
      expect(videoReturned.duracao).toEqual(duracao);
    });
  });
});
