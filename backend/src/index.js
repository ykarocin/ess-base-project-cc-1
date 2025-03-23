const app = require('./app');
const logger = require('./logger');
const Env = require('./env');

app.listen(Env.PORT, () => {
  logger.info(`Server started on http://localhost:${Env.PORT}/api`);
});
