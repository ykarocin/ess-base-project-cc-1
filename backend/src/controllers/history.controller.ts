import { Request, Response, Router } from 'express';
import HistoryService from '../services/history.service';
import { SuccessResult } from '../utils/result';

export default class HistoryController {
  public router: Router;
  private historyService: HistoryService;
  private prefix: string = '/users';

  constructor(router: Router, historyService: HistoryService) {
    this.router = router;
    this.historyService = historyService;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.prefix}/:id/history`, this.getHistory.bind(this));
    this.router.put(`${this.prefix}/:id/history`, this.updateHistory.bind(this));
  }

  private async getHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const history = await this.historyService.getHistory(userId);
      const videoIds = history.map((item) => item.videoId);
      new SuccessResult({
        msg: `${req.method} ${req.originalUrl}`,
        data: videoIds,
      }).handle(res);
    } catch (error: any) {
      res.status(error.status || 500).json({
        msg: error.msg || error.message,
        msgCode: error.msgCode,
      });
    }
  }

  private async updateHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const videoData = req.body;
      const result = await this.historyService.addOrUpdateHistory(userId, videoData);
      const status = result.message === 'Vídeo adicionado ao histórico' ? 201 : 200;
      new SuccessResult({
        msg: `${req.method} ${req.originalUrl}`,
        data: { message: result.message, history: result.history.map(item => item.videoId) },
        code: status,
      }).handle(res);
    } catch (error: any) {
      res.status(error.status || 500).json({
        msg: error.msg || error.message,
        msgCode: error.msgCode,
      });
    }
  }
}
