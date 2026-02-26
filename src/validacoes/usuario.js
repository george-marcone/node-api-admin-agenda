'use strict'
const retorno = require('../services/custom-messages');
const Joi = require('joi');
const {messages} = require('joi-translation-pt-br');

exports.validarConsultar = (req, res, next) => {
    try{

        const { error } = Joi.object({
            login: Joi.string().required()
        }).validate(req.params, { messages });
    
        if (error) {
            const { details } = error; 
            const message = details.map(i => i.message).join(',')
            retorno.mensagemPadrao(message, res, 400)
        }else{
            next();
        }
        
    } catch (error) {
        retorno.mensagemPadrao(error, res, 400);
    }
}

exports.validarInserir = (req, res, next) => {
    try{

        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            login: Joi.string().required()
        }).validate(req.body, { messages });
    
        if (error) {
            const { details } = error; 
            const message = details.map(i => i.message).join(',')
            retorno.mensagemPadrao(message, res, 400)
        }else{
            next();
        }
        
    } catch (error) {
        retorno.mensagemPadrao(error, res, 400);
    }
}