const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');

const router = express.Router();
router.use(
    '/auth',
    createProxyMiddleware({
        target: 'http://ms-auth:8080',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {'^/auth': '/auth'} // Preserva o prefixo /auth
    })
);

module.exports = router;