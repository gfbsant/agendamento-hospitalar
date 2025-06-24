const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: 'Token de autenticação não fornecido.'})
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({message: 'Formato de token invalido.'})
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({message: 'Formato de token inválido'});
    }
    if (!token) {
        return res.status(401).json({mensagem: 'Token não fornecido'});
    }
    try {
        const keyBuffer = Buffer.from(process.env.JWT_SECRET, 'base64');
        req.usuario = jwt.verify(token, keyBuffer);
        return next();
    } catch (e) {
        console.error(e);
        return res.status(401).json({message: 'Token invalido'});
    }
}

const verificarPaciente = (req, res, next) => {
    if (!req.usuario || req.usuario.tipo !== 'PACIENTE') {
        return res.status(403).json({message: 'Acesso negado.'})
    }
    return next();
}

const verificarFuncionario = (req, res, next) => {
    if (!req.usuario || req.usuario.tipo !== 'FUNCIONARIO') {
        return res.status(403).json({message: 'Acesso negado.'})
    }
    return next();
}

module.exports = {
    verificarToken,
    verificarPaciente,
    verificarFuncionario
};