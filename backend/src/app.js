const express = require('express');
require('express-async-errors');
const cors = require('cors');
const logger = require('./logger');
const setupRoutes = require('./routes/index');
const { FailureResult } = require('./utils/result');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

setupRoutes(app);

// Global error handler
app.use((error, req, res, next) => {
  if (error.status >= 500) {
    logger.error(error.toString());
  }
  new FailureResult({
    msg: error.msg || error.message,
    msgCode: error.msgCode,
    code: error.status,
  }).handle(res);
});

module.exports = app;
