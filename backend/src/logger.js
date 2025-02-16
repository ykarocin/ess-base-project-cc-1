const pino = require('pino');

const logger = pino(
  {
    level: process.env.ENV === 'PROD' ? 'info' : 'debug',
  },
  process.stdout
);

module.exports = logger;
