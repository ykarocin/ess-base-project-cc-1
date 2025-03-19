const VideoEntity = require('../entities/video.entity');

class VideoModel {
  constructor(videoEntity) {
    this.videoId = videoEntity.videoId;
    this.titulo = videoEntity.titulo;
    this.duracao = videoEntity.duracao;
    this.views = videoEntity.views;
  }
}

module.exports = VideoModel;