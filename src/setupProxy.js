const { createProxyMiddleware } = require('http-proxy-middleware');
const { BACKEND_CONFIG } = require('./conf');

module.exports = function(app) {
  app.use(BACKEND_CONFIG.API_URL, createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
  app.use(BACKEND_CONFIG.ATTACH_URL, createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
};

