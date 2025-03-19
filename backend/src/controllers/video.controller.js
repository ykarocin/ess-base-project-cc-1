const VideoService = require('../services/video.service');
const { FailureResult } = require('../utils/result');
const { HttpError } = require('../utils/errors/http.error');

class VideoController {
  async getVideo(req, res) {
    try {
      const { id } = req.params;
      const result = await new VideoService().getVideo(id);
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

  async registerView(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const result = await new VideoService().registerView(id, userId);
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

module.exports = VideoController;
