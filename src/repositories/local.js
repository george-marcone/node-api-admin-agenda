'use strict'
const querySD = require("../scripts/solucoesDigitais");
const config = require("../config");
const mysql = require("../services/mysql");
const query = require("../scripts/paginaER");

exports.listarDisponiveisPorMatriz = async (idLocalMatriz) => {
    try {
        const result = await mysql.listar(query.sqlListarLocalDisponivelPorMatriz, config.PaginaERDB, { IdLocalMatriz: idLocalMatriz });
        return result;
    } catch (error) {
        throw error
    }
}

exports.inativar= async (idLocal) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlInativarLocal, config.PaginaERDB, {IdLocal: idLocal});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error;
    }
    return retorno;
}

exports.pesquisar = async () => {
    try {

        const result = await mysql.consultar(querySD.sqlConsultarLocais, config.config.SolucoesDigitaisMYSQL);
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultarPorCep = async (cep) => {
    try {

        const result = await mysql.consultar(querySD.sqlConsultarLocaisPorCep, config.SolucoesDigitaisMYSQL, { Cep: cep });
        return result;

    } catch (error) {
        throw error
    }
}

exports.listar = async (idLocalTipo) => {
    try {
        const result = await mysql.listar(query.sqlListarLocalporTipo, config.PaginaERDB, { IdLocalTipo: idLocalTipo });
        return result;
    } catch (error) {
        throw error
    }
}

exports.listarPorMatriz = async (idLocalMatriz) => {
    try {
        const result = await mysql.listar(query.sqlListarLocalporMatriz, config.PaginaERDB, { IdLocalMatriz: idLocalMatriz });
        return result;
    } catch (error) {
        throw error
    }
}

exports.consultar = async (idLocal) => {
    try {
        const result = await mysql.listar(query.sqlConsultar, config.PaginaERDB, { IdLocal: idLocal });
        return result;
    } catch (error) {
        throw error
    }
}

exports.consultarSebraeAquiPorSlug = async (slug) => {
    try {
        const result = await mysql.consultar(query.sqlConsultarSebraeAquiPorSlug, config.PaginaERDB, { slug: slug });
        return result;
    } catch (error) {
        throw error
    }
}

exports.atualizarContato = async (contato) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAtualizarContato, config.PaginaERDB, contato);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error;
    }
    return retorno;
}

exports.cadastrarEndereco = async (endereco) => {
    let retorno = null;
    try {
        const result = await mysql.incluir(query.sqlCadastrarEndereco, config.PaginaERDB, endereco);
        if (result) retorno = result; 
    } catch (error) {
        throw error;
    }
    return retorno;
}

exports.atualizarEndereco = async (endereco) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAtualizarEndereco, config.PaginaERDB, endereco);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error;
    }
    return retorno;
}

exports.atualizarHorario = async (horario) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAtualizarHorario, config.PaginaERDB, horario);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error;
    }
    return retorno;
}

exports.atualizarServicos = async (servicoOferecido) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAtualizarServicos, config.PaginaERDB, servicoOferecido);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error;
    }
    return retorno;
}

exports.atualizarImagem = async (imagem) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAtualizarImagem, config.PaginaERDB, imagem);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error;
    }
    return retorno;
}

exports.atualizarAviso = async (dados) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAtualizarAviso, config.PaginaERDB, dados);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error;
    }
    return retorno;
}

exports.atualizarSlug = async (dados) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAtualizarSlug, config.PaginaERDB, dados);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error;
    }
    return retorno;
}

exports.atualizarEmailAlerta = async (dados) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAtualizarEmailAlerta, config.PaginaERDB, dados);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error;
    }
    return retorno;
}