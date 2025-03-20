module.exports = (app) => {
  const historyRoutes = require('./history.routes');
  const videoRoutes = require('./video.routes');
  const listRoutes = require('./list.routes');

  app.use('/api', historyRoutes);
  app.use('/api', videoRoutes);
  app.use('/api', listRoutes);
};
