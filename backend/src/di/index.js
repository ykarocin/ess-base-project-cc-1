const Injector = require('./injector');
const HistoryRepository = require('../repositories/history.repository');
const VideoRepository = require('../repositories/video.repository');
const HistoryService = require('../services/history.service');
const VideoService = require('../services/video.service');
const Database = require('../database');

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

module.exports = { di };
