const BaseRepository = require('./base.repository');
const { HttpInternalServerError } = require('../utils/errors/http.error');

class HistoryRepository extends BaseRepository {
  constructor() {
    super('users_history');
  }

  async init() {
    await super.init();
  }

  async getHistoryByUserId(userId) {
    try {
      const sql = `SELECT * FROM users_history WHERE userId = ?`;
      return await this.db.all(sql, [userId]);
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar histórico' });
    }
  }

  async getHistoryItem(userId, videoId) {
    try {
      const sql = `SELECT * FROM users_history WHERE userId = ? AND videoId = ?`;
      return await this.db.get(sql, [userId, videoId]);
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar item de histórico' });
    }
  }
}

module.exports = HistoryRepository;