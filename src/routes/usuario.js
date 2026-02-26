'use strict'
const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuario');
const validacao = require('../validacoes/usuario');
const auth = require('../services/auth');

router.get('/consultar/:login', validacao.validarConsultar, usuario.consultar); 

router.post('/inserir', auth.authorize, validacao.validarInserir, usuario.inserir);
module.exports = router; 