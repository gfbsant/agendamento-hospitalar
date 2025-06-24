const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const {verificarToken, verificarPaciente, verificarFuncionario} = require('../middlewares/auth');

const router = express.Router();

const consultaProxy =
    createProxyMiddleware({
        target: 'http://ms-consulta:8080',
        changeOrigin: true,
        logLevel: 'info',
        pathRewrite: {'^/consulta': ''}
    });

router.get('/agendamentos-paciente', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[ConsultaRoutes] - Recuperar todos os agendamentos request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.get('/disponiveis', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[ConsultaRoutes] - Recuperar consultas disponiveis request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.get('/filtrar', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[ConsultaRoutes] - Filtrar consultas request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);


router.post('/agendar', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[ConsultaRoutes] - Agendar consulta request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.post('/cancelar-agendamento/:codigo', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[ConsultaRoutes] - Cancelar agendamento request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.post('/check-in/:codigo', [verificarToken, verificarPaciente], (req, res, next) => {
    console.log('[ConsultaRoutes] - Check-in request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.get('/proximas-48h', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('[ConsultaRoutes] - Recuperar proximas 48h request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.post('/confirmar-comparecimento/:codigo', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('[ConsultaRoutes] - Confirmar comparecimento request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.post('/cancelar-consulta/:codigo', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('[ConsultaRoutes] - Cancelar consulta request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.post('/realizar-consulta/:codigo', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('[ConsultaRoutes] - Realizar consulta request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.post('/', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('[ConsultaRoutes] - Cadastrar nova consulta request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.get('/funcionarios', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('[ConsultaRoutes] - Listar funcionarios request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.put('/funcionarios/:cpf', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('[ConsultaRoutes] - Atualizar funcionario request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.post('/funcionarios', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('[ConsultaRoutes] - Adicionar funcionario request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

router.patch('/funcionarios/inativar/:cpf', [verificarToken, verificarFuncionario], (req, res, next) => {
    console.log('[ConsultaRoutes] - Inativar funcionario request received: ', {
        metodo: req.method,
        protocolo: req.protocol,
        caminho: req.url
    });
    next();
}, consultaProxy);

module.exports = router;
