const db = require('../database');
const { SuccessResult } = require('../utils/result');
const { HttpNotFoundError } = require('../utils/errors/http.error');

class VideoService {
  async getVideo(videoId) {
    const row = await db.get(`SELECT * FROM videos WHERE videoId = ?`, [videoId]);
    if (!row) {
      throw new HttpNotFoundError({
        msg: 'Vídeo não encontrado',
        msgCode: 'video_not_found',
      });
    }
    return new SuccessResult({
      msg: 'Vídeo encontrado',
      code: 200,
      data: {
        videoId: row.videoId,
        titulo: row.titulo,
        duracao: row.duracao,
        views: row.views,
      },
    });
  }

  async registerView(videoId, userId) {
    const row = await db.get(`SELECT * FROM videos WHERE videoId = ?`, [videoId]);
    if (!row) {
      throw new HttpNotFoundError({
        msg: 'Vídeo não encontrado',
        msgCode: 'video_not_found',
      });
    }
    const updatedViews = (row.views || 0) + 1;
    await db.run(`UPDATE videos SET views = ? WHERE videoId = ?`, [updatedViews, videoId]);

    return new SuccessResult({
      msg: 'Visualização registrada com sucesso',
      code: 201,
      data: {
        message: 'Visualização registrada com sucesso',
        videoId,
        userId,
      },
    });
  }
}

module.exports = VideoService;
