const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "default-src": ["'self'",'https://petshow-backend.herokuapp.com', 'https://br-cidade-estado-nodejs.glitch.me', 'https://nominatim.openstreetmap.org', 'https://www.mercadopago.com.br', 'https://viacep.com.br', 'https://fonts.googleapis.com/', 'https://fonts.gstatic.com', '*.tile.openstreetmap.org'],
        "img-src": ["'self'", '*.tile.openstreetmap.org'],
        "script-src": ["'self'", 'https://www.mercadopago.com.br/integrations'],
        "style-src": ["'self'"]
    }
}));

app.use((req, res, next) => {
    res.setHeader(
      "Permissions-Policy",
      'geolocation=(self), microphone=()'
    );
    next();
});

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