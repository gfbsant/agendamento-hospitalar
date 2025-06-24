const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const {verificarToken, verificarPaciente, verificarFuncionario} = require('../middlewares/auth');


const router = express.Router();

const pacienteProxy =
    createProxyMiddleware({
        target: 'http://ms-paciente:8080',
        changeOrigin: true,
        logLevel: 'info',
        pathRewrite: {'^/paciente': ''}
    });

router.post('/registrar', (req, res, next) => {
    console.log('[PacienteRoutes] - Cancelamento de pontos request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, pacienteProxy);

router.get('/saldo', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[PacienteRoutes] - Verificacao de saldo request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, pacienteProxy);

router.post('/comprar-pontos', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[PacienteRoutes] - Compra de pontos request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, pacienteProxy);

router.post('/usar-pontos', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[PacienteRoutes] - Uso de pontos request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, pacienteProxy);

router.post('/cancelar-pontos', [verificarToken], (req, res, next) => {
    console.log('[PacienteRoutes] - Cancelamento de pontos request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, pacienteProxy);

router.get('/extrato', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[PacienteRoutes] - Extrato request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, pacienteProxy);

module.exports = router;