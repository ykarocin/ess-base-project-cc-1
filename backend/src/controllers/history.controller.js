const HistoryService = require('../services/history.service');
const { FailureResult } = require('../utils/result');
const { HttpError } = require('../utils/errors/http.error');

class HistoryController {
  async getHistory(req, res) {
    try {
      const { id } = req.params;
      const result = await new HistoryService().getHistory(id);
      return result.handle(res);
    } catch (error) {
      if (error instanceof HttpError) {
        return new FailureResult({
          msg: error.msg || error.message,
          msgCode: error.msgCode,
          code: error.status,
        }).handle(res);
      }
      return new FailureResult({ msg: 'Unexpected error' }).handle(res);
    }
  }

  async updateHistory(req, res) {
    try {
      const { id } = req.params;
      const result = await new HistoryService().addOrUpdateHistory(id, req.body);
      return result.handle(res);
    } catch (error) {
      if (error instanceof HttpError) {
        return new FailureResult({
          msg: error.msg || error.message,
          msgCode: error.msgCode,
          code: error.status,
        }).handle(res);
      }
      return new FailureResult({ msg: 'Unexpected error' }).handle(res);
    }
  }
}

module.exports = HistoryController;
