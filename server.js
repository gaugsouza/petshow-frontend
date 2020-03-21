const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/petshow-frontend'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/petshow-frontend/index.html'));
});

app.post('/server/logger', function(req, res) {
    console.log('request', req.body);
    res.status(200).send();
    // console.log('respnse', res.body);
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log("Aplicação rodando em porta 8080");