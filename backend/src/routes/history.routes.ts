import { Router } from 'express';
import HistoryController from '../controllers/history.controller';
import { di } from '../di';
import HistoryService from '../services/history.service';

const router = Router();
const historyService = di.getService(HistoryService);
new HistoryController(router, historyService);

export default router;
