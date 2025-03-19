const express = require('express');
require('express-async-errors');
const cors = require('cors');
const logger = require('./logger');
const setupRoutes = require('./routes/index');
const { FailureResult } = require('./utils/result');
const { HttpError } = require('./utils/errors/http.error');
const Database = require('./database'); // p/ conectar e seedar

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

(async () => {
  await Database.connect();
  await Database.initialize();
  await Database.seed();
})();

setupRoutes(app);

// Tratamento global de erros
app.use((error, req, res, next) => {
  if (error instanceof HttpError) {
    return new FailureResult({
      msg: error.msg || error.message,
      msgCode: error.msgCode,
      code: error.status,
    }).handle(res);
  }
  return new FailureResult({
    msg: error.message || 'Unexpected Error',
    code: 500
  }).handle(res);
});

module.exports = app;
