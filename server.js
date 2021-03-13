const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const pathName = `${__dirname}/dist/petshow-frontend`;
app.use(express.static(pathName));

      
app.get('/*', (_, res) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Content-Security-Policy', 'Content-Security-Policy: default-src https://petshow-backend.herokuapp.com; default-src http://localhost:4200');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff always');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Permissions-Policy', 'geolocation=(self "https://petshow-backend.herokuapp.com" "http://localhost:4200")');
    res.sendFile(path.join(`${pathName}/index.html`));
});

app.post('/server/logger', (_, res) => {
    res.status(200).send();
});

app.listen(process.env.PORT || 4200);
console.info(`Aplicação rodando na porta ${process.env.PORT || 4200}`);