'use strict'

const retorno = require('../services/custom-messages');
const Joi = require('joi');
const {messages} = require('joi-translation-pt-br');

exports.validarDisponibilizar = (req, res, next) => {
    try{
        
        const { error } = Joi.object({
            idAtendimento: Joi.number().required(),
            idLocal: Joi.number().required(),
            exclusivoPJ: Joi.boolean().required(),
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
            categoria: Joi.string().required(),
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
            idAtendimento: Joi.number().required(),
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
                idAtendimento: Joi.number().integer().required(),
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

exports.validarEditar = (req, res, next) => {
    try {
        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            idAtendimento: Joi.number().required(),
            complementoTitulo: Joi.string().allow(null).empty(''),
            exclusivoPJ: Joi.boolean(),
            maisInformacoes: Joi.string().allow(null).empty(''),
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
};

exports.validarRelatorio = (req, res, next) => {
    try {
        const { error } = Joi.object({
            ordenacao: Joi.boolean().optional(),
            tipoProd: Joi.boolean().optional(),
            inicioAcao: Joi.boolean().optional(),
            municipio: Joi.boolean().optional(),
            produto: Joi.boolean().optional(),
            local: Joi.boolean().optional(),
            exclusivoPJ: Joi.boolean().optional(),
        }).validate({ ...req.params, ...req.body }, { messages });

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

exports.validarMarketing = (req, res, next) => {
    try {
        const { error } = Joi.object({
            idLocal: Joi.number().required(),
            idAtendimento: Joi.number().required(),
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
};

exports.validarIdProduto = (req, res, next) => {
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

exports.validarIdKit = (req, res, next) => {
    try{
        
        const { error } = Joi.object({
            idKit: Joi.number().required()
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