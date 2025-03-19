const BaseEntity = require('./base.entity');

class VideoEntity extends BaseEntity {
  constructor({ videoId, titulo, duracao, views }) {
    super();
    this.videoId = videoId;
    this.titulo = titulo;
    this.duracao = duracao;
    this.views = views;
  }
}
module.exports = VideoEntity;