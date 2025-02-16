const { Router } = require('express');
const HistoryService = require('../services/history.service');
const { SuccessResult } = require('../utils/result');

class HistoryController {
  constructor(router, historyService) {
    this.router = router;
    this.historyService = historyService;
    this.prefix = '/users';
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(`${this.prefix}/:id/history`, this.getHistory.bind(this));
    this.router.put(`${this.prefix}/:id/history`, this.updateHistory.bind(this));
  }

  async getHistory(req, res) {
    try {
      const userId = req.params.id;
      const history = await this.historyService.getHistory(userId);
      const videoIds = history.map((item) => item.videoId);
      new SuccessResult({
        msg: `${req.method} ${req.originalUrl}`,
        data: videoIds,
      }).handle(res);
    } catch (error) {
      res.status(error.status || 500).json({
        msg: error.msg || error.message,
        msgCode: error.msgCode,
      });
    }
  }

  async updateHistory(req, res) {
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
    } catch (error) {
      res.status(error.status || 500).json({
        msg: error.msg || error.message,
        msgCode: error.msgCode,
      });
    }
  }
}

module.exports = HistoryController;
