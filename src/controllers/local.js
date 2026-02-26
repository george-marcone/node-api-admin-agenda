'use strict'
const local = require('../dominio/local');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const envio = require('../services/custom-messages');
const consultoria = require('../dominio/consultoria');


exports.listarDisponiveisPorMatriz = async (req, res) => {
    try {
        var locais = await local.listarDisponiveisPorMatriz(req.params.idLocal);
        if (locais && locais.length > 0) res.status(200).send(locais);
        else throw 'Não foram encontradas locais disponíveis';
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.inativar = async (req, res) => {
    try {
        const retorno = await local.inativar(req.params.idLocal);
        if (retorno)
            envio.mensagemPadrao(null, res, 203)
        else throw "Não foi possível realizar a exclusão";
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.pesquisar = async (req, res) => {
    try {
        var idLocal = await local.pesquisar(req.params.cep);
        if (idLocal)
            res.status(200).send(idLocal);
        else
            throw 'Este Cep não pertence ao estado de São Paulo'
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.consultar = async (req, res) => {
    try {
        var result = await local.consultar(req.params.idLocal);
        if (result)
            res.status(200).send(result);
        else
            res.status(400).send({ message: "Não foram encontradas informações disponíveis para a unidade informada"});
            // throw 'Não foram encontradas informações disponíveis para a unidade informada';
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.listar = async (req, res) => {
    try {
        var locais = await local.listarERs();
        if (locais && locais.length > 0)
            res.status(200).send(locais);
        else
            throw 'Não foram encontradas locais disponíveis';
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.listarPorMatriz = async (req, res) => {
    try {
        var locais = await local.listarPorMatriz(req.params.idLocal);
        if (locais && locais.length > 0) res.status(200).send(locais);
        else throw 'Não foram encontradas locais disponíveis';
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

/*Contato*/
exports.atualizarContato = async (req, res) => {
    try {
        const contato = {
            email: req.body.email,
            telefone: req.body.telefone,
            whatsapp: req.body.whatsapp ? req.body.whatsapp : null,
            grupoFacebook: req.body.grupoFacebook ? req.body.grupoFacebook : null,
            idLocal: req.body.idLocal
        };
        const retorno = await local.atualizarContato(contato);
        if (retorno) envio.mensagemPadrao(null, res, 203)
        else throw "Não foi possível realizar a atualização";
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

/*Horario*/
exports.atualizarHorario = async (req, res) => {
    try {
        const horario = {
            horarioInicio: req.body.horarioInicio,
            intervaloInicio: req.body.intervaloInicio ? req.body.intervaloInicio : null,
            intervaloFim: req.body.intervaloFim ? req.body.intervaloFim : null,
            horarioFim: req.body.horarioFim,
            idDiasAtendimento: req.body.idDiasAtendimento,            
            idLocal: req.body.idLocal
        };
        const retorno = await local.atualizarHorario(horario);
        if (retorno) envio.mensagemPadrao(null, res, 203)
        else throw "Não foi possível realizar a atualização";
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

/*Endereço - ESTE ENDPOINT SERÁ DESCONTINUADO */
exports.cadastrarEndereco = async (req, res) => {
    try {
        const endereco = {
            idLocalTipo: req.body.idLocalTipo,
            idLocalMatriz: req.body.idLocalMatriz,
            descricao: req.body.nome,
            CEP: req.body.CEP,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento ? req.body.complemento : null,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            UF: req.body.UF
        };
        const retorno = await local.cadastrarEndereco(endereco);
        if (retorno)
            res.status(201).send({ message: "Endereço cadastrado com sucesso", idLocal: retorno.insertId });
        else throw "Não foi possível realizar o cadastro"
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.atualizarEndereco = async (req, res) => {
    try {
        const endereco = {
            descricao: req.body.nome,
            CEP: req.body.CEP,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento ? req.body.complemento : null,
            bairro: req.body.bairro,
            vidade: req.body.cidade,
            UF: req.body.UF,
            idLocal: req.body.idLocal
        };
        const retorno = await local.atualizarEndereco(endereco);
        if (retorno) envio.mensagemPadrao(null, res, 203)
        else throw "Não foi possível realizar a atualização"
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.atualizarAviso = async (req, res) => {
    try {
        const dados = {
            avisoImportante: req.body.avisoImportante,
            idLocal: req.params.idLocal
        };
        const retorno = await local.atualizarAviso(dados);
        if (retorno) envio.mensagemPadrao(null, res, 203)
        else throw "Não foi possível realizar a atualização"
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.atualizarImagem = async (req, res) => {
    try {
      let atualizaimagem = false
      let escritorio = await local.consultar(parseInt(req.params.idLocal));
      if(!escritorio.slug) throw "Não encontrado Escritório Regional para o parâmentro enviado"
      const destinoUpload = config.Arquivo.destino + escritorio.slug; 

      const upload = multer({ dest: destinoUpload});
  
       upload.single('arquivo')(req, res, async err => {
            if (err)
                envio.mensagemPadrao(err, res, 500)
            else {
                try {
                               
                    if(req.hasOwnProperty('file'))
                    {                        
                        // Deleta o arquivo anterior
                        if (escritorio.imagem && fs.existsSync(path.join(destinoUpload, escritorio.imagem)))
                            fs.unlinkSync(path.join(destinoUpload, escritorio.imagem)); 
                        else // Valor da imagem no banco, se nula será necessário atualizar na base
                            atualizaimagem = true
                        
                        // Se a extensão for diferente da extensão do arquivo que está sendo upado, será necessário atualizar na base
                        if (!atualizaimagem && escritorio.imagem && req.file.originalname &&
                            !escritorio.imagem.includes(path.extname(req.file.originalname)))
                            atualizaimagem = true
                            
                        // Alterando o arquivo para o novo nome
                        // Caso exista imagem, permanece o mesmo nome, caso não, o arquivo é renomeado com o slug
                        if(req.file.originalname)
                            escritorio.imagem = escritorio.imagem? escritorio.imagem : escritorio.slug + `${path.extname(req.file.originalname)}`;
                        
                        if(req.file.path)
                            fs.renameSync(path.join(req.file.path), path.join(destinoUpload, escritorio.imagem )); 
                    }
                    
                    // Caso o local Escritótio ou Posto de Atendimento não possua imagem
                    // Ou a extensão do arquivo seja diferente da imagem que está no banco
                    if (atualizaimagem) {
                        const itemimagem = {
                            imagem: escritorio.imagem,
                            IdLocal: parseInt(req.params.idLocal),
                        };
                        await local.atualizarImagem(itemimagem);                        
                    }
                    envio.mensagemPadraoComObjeto(null, res, 203, escritorio)                    
                } catch (error) {
                    envio.mensagemPadrao(error, res, 400)
                }                
            }
        });
    }
    catch (e) {
      envio.mensagemPadrao(e, res, 400)
    }    
}

exports.atualizarServicos = async (req, res) => {
    try {
        const servicoOferecido = {
            servicosOferecidos: req.body.servicosOferecidos.join(' | '), 
            idLocal: req.body.idLocal
        };
        const retorno = await local.atualizarServicos(servicoOferecido);
        if (retorno) envio.mensagemPadrao(null, res, 203)
        else throw "Não foi possível realizar a atualização";
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}


exports.atualizarSlug = async (req, res) => {
    try {
        const dados = {
            nome: req.body.nome,
            slug: req.body.slug,
            idLocal: req.body.idLocal
        };
        const retorno = await local.atualizarSlug(dados);
        if (retorno) envio.mensagemPadrao(null, res, 203)
        else throw "Não foi possível realizar a atualização";
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}

exports.atualizarEmail = async (req, res) => {
    try {
        const dados = {
            email: req.body.emailAlerta,
            idLocal: req.params.idLocal
        };
        const retorno = await local.atualizarEmailAlerta(dados);

        await consultoria.enviarEmailTeste(req.params.idLocal);

        if (retorno) envio.mensagemPadrao(null, res, 203)
        else throw "Não foi possível realizar a atualização";
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)
    }
}