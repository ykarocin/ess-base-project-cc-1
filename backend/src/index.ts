import app from './app';
import logger from './logger';
import Env from './env';
import Database from './database';

(async () => {
  const dbInstance = await Database.getInstance();
  await dbInstance.seed(); // Aguarda a semeadura do banco
  app.listen(Env.PORT, () => {
    logger.info(`Server started on http://localhost:${Env.PORT}/api`);
  });
})();
