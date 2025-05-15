const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const pacienteRoutes = require('./routes/paciente');
const consultaRoutes = require('./routes/consulta');

app.use(cors());

app.use('/', [authRoutes, pacienteRoutes, consultaRoutes]);

app.listen(8080, () => {
    console.log('API Gateway rodando em http://localhost:8080');
});
