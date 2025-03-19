const express = require('express');
const router = express.Router();

const HistoryController = require('../controllers/history.controller');
const VideoController = require('../controllers/video.controller');

const historyCtrl = new HistoryController();
const videoCtrl = new VideoController();

// Rotas para Histórico
router.get('/users/:id/history', (req, res) => historyCtrl.getHistory(req, res));
router.put('/users/:id/history', (req, res) => historyCtrl.updateHistory(req, res));

// Rotas para Vídeo
router.get('/videos/:id', (req, res) => videoCtrl.getVideo(req, res));
router.post('/videos/:id/visualizacao', (req, res) => videoCtrl.registerView(req, res));

module.exports = (app) => {
  app.use('/api', router);
};
