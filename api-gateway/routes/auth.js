const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const router = express.Router();
const {verificarToken, verificarPaciente, verificarFuncionario} = require('../middlewares/auth');

const authProxy = createProxyMiddleware({
    target: 'http://ms-auth:8080',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {'^/auth': ''}
});

router.post('/login', (req, res, next) => {
    console.log('Login request received:', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, authProxy);

router.delete('/usuario', (req, res, next) => {
    console.log('Delete request received:', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, authProxy)

router.post('/registro-paciente', (req, res, next) => {
    console.log('Registro de Paciente request received:', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, authProxy);

router.post('/registro-funcionario', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('Registro de Funcionario request received:', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, authProxy);

router.put('/atualizar-email/:cpf', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('Atualizacao de e-mail request received:', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, authProxy);


router.get('/existe', (req, res, next) => {
    console.log('Verificacao \"existe\" request received:', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, authProxy);

module.exports = router;