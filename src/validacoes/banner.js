'use strict'
const retorno = require('../services/custom-messages');
const Joi = require('joi');
const {messages} = require('joi-translation-pt-br');

exports.validarCadastro = (req, res, next) => {
    try{

        const { error } = Joi.object({
            idLocal: Joi.number().required()
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

exports.validarIdBanner = (req, res, next) => {
    try {

        const { error } = Joi.object({
            idBanner: Joi.number().required()
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

exports.validarOrdenar = async (req, res, next) => {
    try {
      const schema = Joi.object({
        payload: Joi.array()
          .min(1)
          .items(
            Joi.object({
              idBanner: Joi.number().integer().required(),
              idLocal: Joi.number().integer().required()
            })
          )
          .required()
      });
  
      const { error } = schema.validate(req.body);
      if (error) {
        throw error.details[0].message;
      }
  
      next();
    } catch (error) {
      retorno.mensagemPadrao(error, res, 400);
    }
  };