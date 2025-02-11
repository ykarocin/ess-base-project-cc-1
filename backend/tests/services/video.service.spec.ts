import VideoEntity from '../../src/entities/video.entity';
import VideoService from '../../src/services/video.service';
import VideoRepository from '../../src/repositories/video.repository';
import { HttpNotFoundError } from '../../src/utils/errors/http.error';

describe('VideoService', () => {
  let mockVideoRepository: VideoRepository;
  let service: VideoService;

  const mockVideo: VideoEntity = new VideoEntity({
    videoId: '101',
    titulo: 'Stranger Things - Piloto',
    duracao: '45 minutos',
    views: 0,
  });

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

  it('should return video data if it exists', async () => {
    (mockVideoRepository.getVideoByVideoId as jest.Mock).mockResolvedValue(mockVideo);
    const video = await service.getVideo('101');
    expect(video).toEqual(mockVideo);
    expect(mockVideoRepository.getVideoByVideoId).toBeCalledWith('101');
  });

  it('should throw an error if video is not found', async () => {
    (mockVideoRepository.getVideoByVideoId as jest.Mock).mockResolvedValue(null);
    await expect(service.getVideo('999')).rejects.toThrow(HttpNotFoundError);
  });

  it('should register a view for a video', async () => {
    (mockVideoRepository.getVideoByVideoId as jest.Mock).mockResolvedValue(mockVideo);
    (mockVideoRepository.update as jest.Mock).mockResolvedValue({
      ...mockVideo,
      views: mockVideo.views + 1,
    });
    const result = await service.registerView('101', '1');
    expect(result.message).toEqual('Visualização registrada com sucesso');
    expect(result.videoId).toEqual('101');
    expect(result.userId).toEqual('1');
    expect(mockVideoRepository.update).toBeCalled();
  });
});
