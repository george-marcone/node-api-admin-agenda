'use strict'
const usuario = require('../dominio/usuario');
const envio = require('../services/custom-messages');

exports.consultar = async (req, res) => {
    try {

        let retorno = await usuario.consultar(req.params.login);
        //TODO: verificar se essa validação está ok
        if (retorno)
            res.status(200).send(retorno);
        else
            throw 'Usuário não encontrado pelo login informado'
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.inserir = async (req, res) => {
    try {
        await usuario.inserir(req.body.login, req.body.idLocal);
        envio.mensagemPadrao(null, res, 201)
        // res.status(201).send({ message: 'Usuário incluído com sucesso' });
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)        
    }
}