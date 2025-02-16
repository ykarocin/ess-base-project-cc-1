import Injector from './injector';
import HistoryRepository from '../repositories/history.repository';
import VideoRepository from '../repositories/video.repository';
import HistoryService from '../services/history.service';
import VideoService from '../services/video.service';
import Database from '../database';

const di = new Injector();

const historyRepo = new HistoryRepository();
const videoRepo = new VideoRepository();

(async () => {
  await historyRepo.init();
  await videoRepo.init();
  const dbInstance = await Database.getInstance();
  await dbInstance.seed();
})();

di.registerRepository(HistoryRepository, historyRepo);
di.registerRepository(VideoRepository, videoRepo);

di.registerService(HistoryService, new HistoryService(di.getRepository(HistoryRepository)));
di.registerService(VideoService, new VideoService(di.getRepository(VideoRepository)));

export { di };
