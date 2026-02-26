'use strict'
const material = require("../repositories/material-apoio");

exports.consultarMatApoioConsultoria = async (idConsultoria) => {
    try {
        let result =  await material.consultarMatApoioConsultoria(idConsultoria);
        return result;
    } catch (error) {
        throw error
    }
}

exports.registrarDownload = async (registro) => {
    try {
        let result =  await material.registrarDownload(registro);
		return result;
    } catch (error) {
        throw error
    }
}

exports.consultarDownloadEbook = async (cpf, idConteudoApoio) => {
    try {
        let result =  await material.consultarDownloadEbook(cpf, idConteudoApoio);
        return result;
    } catch (error) {
        throw error
    }
}

exports.qtdEbookDisponivel = async () => {
    try {
        let result =  await material.qtdEbookDisponivel();
        return result;
    } catch (error) {
        throw error
    }
}


exports.listarEbooksDisponiveis = async () => {
    try {
        let result = await material.listarEbooksDisponiveis();
        return result;
    } catch (error) {
        throw error
    }
}

exports.consultarEbookPorIdProduto = async (idProduto) => {
    try {
        let result = await material.consultarEbookPorIdProduto(idProduto);
        return result;
    } catch (error) {
        throw error
    }
}
