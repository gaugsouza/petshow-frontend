const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(helmet());


const pathName = `${__dirname}/dist/petshow-frontend`;
app.use(express.static(pathName));

      
app.get('/*', (_, res) => {
    res.sendFile(path.join(`${pathName}/index.html`));
});

app.post('/server/logger', (_, res) => {
    res.status(200).send();
});

app.listen(process.env.PORT || 4200);
console.info(`Aplicação rodando na porta ${process.env.PORT || 4200}`);