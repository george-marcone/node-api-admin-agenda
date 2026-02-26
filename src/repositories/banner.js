'use strict'
const mysql = require("../services/mysql");
const query = require("../scripts/paginaER");
const config = require("../config");

exports.listar = async (idLocal) => {
    try {

        const result = await mysql.listar(query.sqlListarBanner, config.PaginaERDB, { IdLocal: idLocal });
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultar = async (idBanner) => {
    try {

        const result = await mysql.listar(query.sqlConsultarBanner, config.PaginaERDB, { IdBanner: idBanner });
        return result;
    } catch (error) {
        throw error
    }
}

exports.incluir = async (banner) => {
    // IdLocal, Titulo, Formato, Situacao
    try {      
         const result = await mysql.incluir(query.sqlIncluirBanner,config.PaginaERDB,banner);   
        return result;
        } catch (error) {
        throw error
    }
}

    exports.alterar = async (banner) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAlterarBanner, config.PaginaERDB, banner);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno
}

exports.excluir = async (idBanner) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlExcluirBanner, config.PaginaERDB, {IdBanner:idBanner});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno
}

exports.priorizarBanner = async (cursoOrdenar) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(query.sqlAlterarBannerOrdenacao, config.PaginaERDB, cursoOrdenar);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.consultarMaxOrdenacao = async (idLocal) => {
    try {
        const result = await mysql.listar(query.sqlConsultarOrdenacaoBanner, config.PaginaERDB, { IdLocal: idLocal });
        return result;
    } catch (error) {
        throw error
    }
}