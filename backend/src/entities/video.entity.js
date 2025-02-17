const BaseEntity = require('./base.entity');

class VideoEntity extends BaseEntity {
  constructor({ videoId, titulo, duracao, views, likes = 0, videoLink = '' }) {
    super();
    this.videoId = videoId;
    this.titulo = titulo;
    this.duracao = duracao;
    this.views = views;
    this.likes = likes;
    this.videoLink = videoLink;
  }
}

module.exports = VideoEntity;
