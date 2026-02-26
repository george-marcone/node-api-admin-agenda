'use strict'
// const util = require('../util/index');
const retorno = require('../services/custom-messages');
const Joi = require('joi');
const {messages} = require('joi-translation-pt-br');

exports.validarDisponibilizar = (req, res, next) => {
    try{
        
        const { error } = Joi.object({
            idConsultoria: Joi.number().required(),
            idLocal: Joi.number().required(),
            exibirFormulario: Joi.boolean().optional().allow(null),
            divulgarMarketing: Joi.boolean().optional().allow(null)
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

exports.validarListar = (req, res, next) => {
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

exports.validarListarSebraeAqui = (req, res, next) => {
    try{

        const { error } = Joi.object({
            slug: Joi.string().required()
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

exports.validarDisponibilizarEmLote = (req, res, next) => {
    try{

        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            disponivel: Joi.boolean().required()
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

exports.validarDestacar = (req, res, next) => {
    try{

        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            idConsultoria: Joi.number().required(),
            destaque: Joi.boolean().required()
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


exports.validarOrdenar = (req, res, next) => {
    try {
        const schema = Joi.object({
          payload: Joi.array()
            .min(1)
            .items(
              Joi.object({
                idConsultoria: Joi.number().integer().required(),
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
}

exports.validarExcluirInteressado = (req, res, next) => {
    try {
        
        const { error } = Joi.object({
            idInteracao: Joi.number().required(),
            faraConsultoria: Joi.boolean().required()
        }).validate(req.body, { messages });    
        
        if (error) {
          throw error.details[0].message;
        }
    
        next();
      } catch (error) {
        retorno.mensagemPadrao(error, res, 400);
      }
}

exports.validarCadastroInteressado = (req, res, next) => {
    try{

        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            idProduto: Joi.number().required(),
            motivo: Joi.string().empty('').allow(null), 
            token: Joi.string().required()
            // telefone: Joi.string().empty('').allow(null).custom((value, helper) => {
            //     if (!util.validarCelular(value) && !util.validarTelefone(value)) {
            //       return helper.message("A propriedade telefone está no formato incorreto");
            //     }
            //     return true;
            //   }),
            // email: Joi.string().email().required()
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

exports.validarEditar = (req, res, next) => {
    try {
        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            idProduto: Joi.number().required(),                        
            maisInformacoes: Joi.string().allow(null).empty(''),
            exibirFormulario: Joi.boolean().optional().allow(null),
            divulgarMarketing: Joi.boolean().optional().allow(null)
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

exports.validarMaterialApoio = (req, res, next) => {
    try{
        
        const { error } = Joi.object({
            idProduto: Joi.number().required()
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


exports.validarEbook = (req, res, next) => {
    try{

        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            idProduto: Joi.number().required(),
            idConteudoApoio: Joi.number().required(),
            token: Joi.string().required()
            // telefone: Joi.string().empty('').allow(null).custom((value, helper) => {
            //     if (!util.validarCelular(value) && !util.validarTelefone(value)) {
            //       return helper.message("A propriedade telefone está no formato incorreto");
            //     }
            //     return true;
            //   }),
            // email: Joi.string().email().required()
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

exports.validarMarketing = (req, res, next) => {
    try{
        
        const { error } = Joi.object({
            idProduto: Joi.number().required(),
            idLocal: Joi.number().required(),
            divulgarMarketing: Joi.boolean().optional().allow(null)
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