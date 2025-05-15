const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

router.use(
    '/',
    createProxyMiddleware({
        target: 'http://ms-paciente:8080',
        changeOrigin: true,
        logLevel: 'debug'
    })
);

module.exports = router;
