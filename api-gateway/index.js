const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('API Gateway funcionando!');
});

app.listen(port, () => {
    console.log(`API Gateway ouvindo em http://localhost:${port}`);
});
