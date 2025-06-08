const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

router.use(
    '/paciente',
    createProxyMiddleware({
        target: 'http://ms-paciente:8080',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {'^/paciente': '/paciente'}
    })
);

module.exports = router;