'use strict'
const express = require('express');
const app = express();
const logger = require('./services/logger');
const swagger = require('./services/swagger');
const config = require('./config');
var cors = require('cors');
const cron = require("node-cron");
const email = require('./util/mensal-email-cron')
require('dotenv').config();



swagger(app);
//Carrega rotas
const index = require('./routes/index-route');
const evento = require('./routes/evento');
const usuario = require('./routes/usuario');
const local = require('./routes/local');
const banner = require('./routes/banner');
const consultoria = require('./routes/consultoria');
const estatistica = require('./routes/estatistica');
const material = require('./routes/material-apoio');
const publicUpload = require('./routes/public');
const campanha = require('./routes/campanha');

// Setup cron
if(process.env.AGENDAMENTO_ATIVO == 'true'){
    var task = cron.schedule(process.env.AGENDAMENTO_HORARIO, async () => {
        await email.sendEmail()
    },
    {
        scheduled: true
    });

    task.start();
}

//configuração do body-parserclear
app.use(express.json(
    {
        limit: '2mb' //Limita o tamanho do JSON - Depende se nele tera imagem base 64, por exemplo
    }
)); //define que o bodyparser ira codificar em JSON

// Habilita o CORS - Ele autoriza quais são os pontos que poderão usar a API e quais as permissões específicas

app.use(function (req, res, next) {

    if (process.env.NODE_ENV.includes('prod')) {
        const allowedOrigins = ['https://agenda.sebraesp.com.br', 'https://adminagenda.sebraesp.com.br','https://front-agenda-hml.sebraesp.com.br'];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    }
    else
        res.header('Access-Control-Allow-Origin', '*');
    ////Determina quais são as URLS
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, compress, br, x-access-token'); // É necessário incluir x-access-token para usar no READER
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); //Quais são os metodos
    
    // Log nas rotas desabilitado
    // if (config.Parametros.logAtivo) 
    //     logger.error(`Requisição recebida: ${req.method} ${req.url}`);

    next();
});

app.options('*', cors());


app.use(express.urlencoded({ extended: true })); //define que o express não vai codificar a url

app.use('/', index);
app.use('/evento', evento);
app.use('/local', local);
app.use('/usuario', usuario);
app.use('/banner', banner);
app.use('/consultoria', consultoria);
app.use('/estatistica', estatistica);
app.use('/material-apoio', material);
app.use('/campanha', campanha);

// Essa linha faz o servidor disponibilizar o acesso às imagens via URL!
app.use('/public', publicUpload, express.static('public'));
module.exports = app; //exporta o modulo