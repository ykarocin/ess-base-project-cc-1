module.exports = (app) => {
  const historyRoutes = require('./history.routes');
  const videoRoutes = require('./video.routes');

  app.use('/api', historyRoutes);
  app.use('/api', videoRoutes);
};
