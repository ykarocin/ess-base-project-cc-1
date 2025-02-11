import { Express } from 'express';
import historyRoutes from './history.routes';
import videoRoutes from './video.routes';

export default (app: Express): void => {
  app.use('/api', historyRoutes);
  app.use('/api', videoRoutes);
};
