const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const rotas = require('../app/rotas.js'); // informar o express que vamos usar o EJS como engine de visualização 

app.use(session({secret: 'teste123',saveUninitialized: true,resave: true}));
app.set('view engine', 'ejs'); // informar o express que vamos usar os módulos relacionados às variaveis abaixo 
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static('public')); // passar como parâmetro para o módulo rotas.js 

rotas(app);

module.exports = app;
