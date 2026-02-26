'use strict'
const campanha = require("../repositories/campanha");

exports.criar = async (item) => {
    try {
        const result = await campanha.criar(item)
        return result;

    } catch (error) {
        throw error
    }
}

exports.listar = async (idLocal) => {
    try {
        const result = await campanha.listar(idLocal);
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultar = async (idCampanha) => {
    try {
        const result = await campanha.consultar(idCampanha);
        return result;

    } catch (error) {
        throw error
    }
}

exports.atualizar = async (item) => {
    try {
        const result = await campanha.atualizar(item);
        return result;

    } catch (error) {
        throw error
    }
}

exports.publicar = async (idCampanha) => {
    try {
        const result = await campanha.publicar(idCampanha);
        return result;

    } catch (error) {
        throw error
    }
}

exports.excluir = async (idCampanha) => {
    try {
        const result = await campanha.excluir(idCampanha);
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultarPorKit = async (idExecucaoKit) => {
    try {
        const result = await campanha.consultarPorKit(idExecucaoKit);
        return result;

    } catch (error) {
        throw error
    }
}

exports.listarCampanhaPorStatus = async (idLocal) => {
    try {
        const result = await campanha.listarCampanhaPorStatus(idLocal);
        return result;

    } catch (error) {
        throw error
    }
}