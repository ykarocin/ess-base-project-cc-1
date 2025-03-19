const db = require('../database');
const { SuccessResult } = require('../utils/result');
const { HttpNotFoundError } = require('../utils/errors/http.error');

class HistoryService {
  async getHistory(userId) {
    const rows = await db.all(
      `SELECT videoId FROM users_history WHERE userId = ?`,
      [userId]
    );

    if (rows.length === 0) {
      throw new HttpNotFoundError({
        msg: 'Usuário não encontrado',
        msgCode: 'user_not_found',
      });
    }

    const videoIds = rows.map((r) => r.videoId).filter(Boolean);

    return new SuccessResult({
      msg: 'Histórico retornado com sucesso',
      code: 200,
      data: videoIds,
    });
  }

  async addOrUpdateHistory(userId, { videoId }) {
    // Verifica se o usuário existe na tabela "users"
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [userId]);
    if (!user) {
      throw new HttpNotFoundError({
        msg: 'Usuário não encontrado',
        msgCode: 'user_not_found',
      });
    }

    // Verifica se já existe um registro de histórico para o usuário e vídeo
    const existingHistory = await db.get(
      `SELECT * FROM users_history WHERE userId = ? AND videoId = ?`,
      [userId, videoId]
    );

    if (!existingHistory) {
      // Inserção nova
      await db.run(
        `INSERT INTO users_history (userId, videoId, ultimaVisualizacao) VALUES (?, ?, ?)`,
        [userId, videoId, new Date().toISOString()]
      );

      return new SuccessResult({
        msg: 'Vídeo adicionado ao histórico',
        code: 201,
        data: { userId, videoId },
      });
    }

    // Atualiza registro existente
    await db.run(
      `UPDATE users_history SET ultimaVisualizacao = ? WHERE userId = ? AND videoId = ?`,
      [new Date().toISOString(), userId, videoId]
    );

    return new SuccessResult({
      msg: 'Data de visualização atualizada',
      code: 200,
      data: { userId, videoId },
    });
  }

  async getHistoryItem(userId, videoId) {
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [userId]);
    if (!user) {
      throw new HttpNotFoundError({
        msg: 'Usuário não encontrado',
        msgCode: 'user_not_found',
      });
    }
    const row = await db.get(
      `SELECT * FROM users_history WHERE userId = ? AND videoId = ?`,
      [userId, videoId]
    );
    if (!row) {
      throw new HttpNotFoundError({
        msg: 'Histórico não contém esse vídeo',
        msgCode: 'history_item_not_found',
      });
    }
    return new SuccessResult({
      msg: 'Item de histórico encontrado',
      code: 200,
      data: { userId: row.userId, videoId: row.videoId },
    });
  }
}

module.exports = HistoryService;
