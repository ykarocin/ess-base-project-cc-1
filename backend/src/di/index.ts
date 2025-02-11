import Injector from './injector';
import HistoryRepository from '../repositories/history.repository';
import VideoRepository from '../repositories/video.repository';
import HistoryService from '../services/history.service';
import VideoService from '../services/video.service';

const di = new Injector();

di.registerRepository(HistoryRepository, new HistoryRepository());
di.registerRepository(VideoRepository, new VideoRepository());

di.registerService(HistoryService, new HistoryService(di.getRepository(HistoryRepository)));
di.registerService(VideoService, new VideoService(di.getRepository(VideoRepository)));

export { di };
