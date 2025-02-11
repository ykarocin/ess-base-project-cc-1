import { Request, Response, Router } from 'express';
import VideoService from '../services/video.service';
import { SuccessResult } from '../utils/result';

export default class VideoController {
  public router: Router;
  private videoService: VideoService;
  private prefix: string = '/videos';

  constructor(router: Router, videoService: VideoService) {
    this.router = router;
    this.videoService = videoService;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.prefix}/:id`, this.getVideo.bind(this));
    this.router.post(`${this.prefix}/:id/visualizacao`, this.registerView.bind(this));
    // Se houver endpoints de curtidas, você pode adicioná-los aqui
  }

  private async getVideo(req: Request, res: Response): Promise<void> {
    try {
      const videoId = req.params.id;
      const video = await this.videoService.getVideo(videoId);
      new SuccessResult({
        msg: `${req.method} ${req.originalUrl}`,
        data: video,
      }).handle(res);
    } catch (error: any) {
      res.status(error.status || 500).json({ msg: error.msg || error.message, msgCode: error.msgCode });
    }
  }

  private async registerView(req: Request, res: Response): Promise<void> {
    try {
      const videoId = req.params.id;
      const { userId } = req.body;
      const result = await this.videoService.registerView(videoId, userId);
      new SuccessResult({
        msg: `${req.method} ${req.originalUrl}`,
        data: result,
        code: 201,
      }).handle(res);
    } catch (error: any) {
      res.status(error.status || 500).json({ msg: error.msg || error.message, msgCode: error.msgCode });
    }
  }
}
