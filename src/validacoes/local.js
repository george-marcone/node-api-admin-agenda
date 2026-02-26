'use strict'
const util = require('../util/index');
const retorno = require('../services/custom-messages');
const Joi = require('joi');
const {messages} = require('joi-translation-pt-br');


exports.validarIdLocal = (req, res, next) => {
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

exports.validarCEP = (req, res, next) => {
  try {
    const { error } = Joi.object({
      cep: Joi.string().length(8).pattern(/^\d+$/).required()
    }).validate(req.params, { messages });

    if (error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      retorno.mensagemPadrao(message, res, 400);
    } else {
      next();
    }
  } catch (error) {
    retorno.mensagemPadrao(error, res, 400);
  }
};

exports.validarInativar = (req, res, next) => {
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

exports.validarHorario = (req, res, next) => {
    try{

        const { error } = Joi.object({
            idDiasAtendimento: Joi.number().required(),
            horarioInicio: Joi.string().required().custom((value, helper) => {
                if (!util.validarHorario(value)) {
                  return helper.message("A propriedade horarioInicio está no formato incorreto. Exemplo: 23:59");
                }
                return true;
              }),
            horarioFim: Joi.string().required().custom((value, helper) => {
                if (!util.validarHorario(value)) {
                  return helper.message("A propriedade horarioFim está no formato incorreto. Exemplo: 23:59");
                }
                return true;
              }),
            intervaloInicio: Joi.string().allow(null).custom((value, helper) => {
                if (!util.validarHorario(value)) {
                  return helper.message("A propriedade horarioFim está no formato incorreto. Exemplo: 23:59");
                }
                return true;
              }),
            intervaloFim: Joi.string().allow(null).custom((value, helper) => {
                if (!util.validarHorario(value)) {
                  return helper.message("A propriedade horarioFim está no formato incorreto. Exemplo: 23:59");
                }
                return true;
              }),
            idLocal: Joi.number().required()
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

exports.validarEndereco = (req, res, next) => {
    try{

        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            CEP: Joi.string().required().custom((value, helper) => {
                if (!util.validarCEP(value)) {
                  return helper.message("A propriedade CEP está no formato incorreto");
                }
                return true;
              }),
            logradouro: Joi.string().required(),
            numero: Joi.string().required(),
            complemento: Joi.string().allow(null),
            bairro: Joi.string().required(),
            cidade: Joi.string().required(),
            UF: Joi.string().required(),
            nome: Joi.string().optional(),
            idLocalTipo: Joi.number().allow(null)
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

exports.validarServicos = (req, res, next) => {
    try {
        const { error } = Joi.object({
            servicosOferecidos: Joi.array().items(Joi.string()).required(),
            idLocal: Joi.number().required()
        }).validate(req.body, { messages });

        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            retorno.mensagemPadrao(message, res, 400);
        } else {
            next();
        }
    } catch (error) {
        retorno.mensagemPadrao(error, res, 400);
    }
}

exports.validarAlteracaoImagem = (req, res, next) => {
    try {
        const { error } = Joi.object({
            idLocal: Joi.number().required()
        }).validate({ idLocal: req.params.idLocal }, { messages });

        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            retorno.mensagemPadrao(message, res, 400);
        } else {
            next();
        }
    } catch (error) {
        retorno.mensagemPadrao(error, res, 400);
    }
}

exports.validarSlug = (req, res, next) => {
    try{

        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            slug: Joi.string().required(),
            nome: Joi.string().required()
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

exports.validarContato = (req, res, next) => {
    try{
        
        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            idLocalMatriz: Joi.number().allow(null),
            email: Joi.string().email().required(),
            grupoFacebook: Joi.string().allow(null).custom((value, helper) => {
                if (!util.validarURL(value)) {
                  return helper.message("A propriedade grupoFacebook está no formato incorreto");
                }
                return true;
              }),
            telefone: Joi.string().required().allow(null).custom((value, helper) => {
                if (value && value != '') {
                    if (!util.validarTelefone(value.toString().replace(/\D/g, '')) && !util.validarCelular(value.toString().replace(/\D/g, ''))) {
                      return helper.message("A propriedade telefone está no formato incorreto");
                    }
                    return true;   
                }
              }),
            whatsapp: Joi.string().allow(null).custom((value, helper) => {
                if (value && value != '') {
                    if (!util.validarCelular(value.toString().replace(/\D/g, '')) && !util.validarTelefone(value.toString().replace(/\D/g, ''))) {
                      return helper.message("A propriedade whatsapp está no formato incorreto");
                    }
                    return true;                    
                }
              })
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

exports.validarEmail = (req, res, next) => {
    try{

        const { error } = Joi.object({
            emailAlerta: Joi.string().email().optional().allow(null),
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
