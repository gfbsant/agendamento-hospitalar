const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const authRoutes = require('./routes/auth');
const pacienteRoutes = require('./routes/paciente');
const consultaRoutes = require('./routes/consulta');

app.use(cors());

app.use('/auth', authRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/consulta', consultaRoutes);

app.listen(8080, () => {
    console.log('API Gateway rodando em http://localhost:8080');
});
