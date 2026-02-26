'use strict'
const retorno = require('../services/custom-messages');
const Joi = require('joi');
const {messages} = require('joi-translation-pt-br');

exports.validarCriacao = (req, res) => {
    try{

        const { error } = Joi.object({
            codigoDoKit: Joi.number().min(1).max(99999999).required(),
            nome: Joi.string().max(150).required(),
            cor: Joi.string().max(7).required(),
            tag: Joi.string().max(20).required(),
            ativar: Joi.string().required(),
            imgCard: Joi.binary().optional().allow(null).allow(''),
            idCampanha: Joi.string().optional(),
        }).validate(req.body, { messages });
    
        if (error) {
            const { details } = error; 
            const message = details.map(i => i.message).join(',')
            retorno.mensagemPadrao(message, res, 400)
            // throw message
        }

    } catch (error) {
        retorno.mensagemPadrao(message, res, 400)
        // throw error;
    }
}
