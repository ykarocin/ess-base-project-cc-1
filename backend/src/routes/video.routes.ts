import { Router } from 'express';
import VideoController from '../controllers/video.controller';
import { di } from '../di';
import VideoService from '../services/video.service';

const router = Router();
const videoService = di.getService(VideoService);
new VideoController(router, videoService);

export default router;
