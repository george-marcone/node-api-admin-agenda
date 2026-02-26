'use strict'
const util = require('../util/index');
const retorno = require('../services/custom-messages');
const Joi = require('joi');
const { messages } = require('joi-translation-pt-br');
const logger = require('../services/logger');

exports.validarUsuarioDownloadEbook = (user, res) => {
    try {
        
        const { error } = Joi.object({
            cpf: Joi.number().required()
        }).validate(user, { messages });
    
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',')
            logger.error("Error: " + message);
            return false;
        } else {
            return true;            
        }
        
    } catch (error) {
        retorno.mensagemPadrao(error, res, 400);
    }
};

exports.validarDadosUsuarioInteressado = (dadosAmei, res) => {
    try {
        
        const { error } = Joi.object({
            nome: Joi.string().required(),
            telefone: Joi.string().optional().allow(null).empty('').custom((value, helper) => {
                if (value || value != '') {
                    if (!util.validarTelefone(value.toString().replace(/\D/g, '')) && !util.validarCelular(value.toString().replace(/\D/g, ''))) {
                      return helper.message("A propriedade telefone está no formato incorreto");
                    }
                    return true;                    
                }
              }),
            email: Joi.string().required(),
        }).validate(dadosAmei, { messages });
    
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            logger.error("Error: " + message);
            return {message: message, ok: false};
        } else {
            return {message: '', ok: true};
        }        
    } catch (error) {
        retorno.mensagemPadrao(error, res, 400);
    }
};