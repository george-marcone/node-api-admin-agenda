'use strict'
const mysql = require("../services/mysql");
const query = require("../scripts/solucoesDigitais");
const config = require("../config");
const queryAgendaER = require("../scripts/paginaER");



exports.consultarMatApoioConsultoria = async (idConsultoria) => {
    try {

        const result = await mysql.consultar(query.sqlConsultaMatApoioConsultoria, config.SolucoesDigitaisMYSQL, { IdProduto: idConsultoria});

        return result;

    } catch (error) {
        throw error
    }
}

exports.registrarDownload = async (registro) => {
    try {

        const result = await mysql.incluir(queryAgendaER.sqlRegistroDownload, config.PaginaERDB, {
            IdConteudoApoio: registro.idConteudoApoio,
            IdProduto: registro.idProduto || null,
            IdLocal: registro.idLocal,
            CpfInteressado: registro.cpf 
        });		
		return result;
		
    } catch (error) {
        throw error
    }
}

exports.consultarDownloadEbook = async (cpf, idConteudoApoio) => {
    try {
        const result = await mysql.consultar(queryAgendaER.sqlConsultaDownLoadEbook, config.PaginaERDB, { CpfInteressado: cpf, IdConteudoApoio: idConteudoApoio });
        return result;
    } catch (error) {
        throw error
    }
}

exports.qtdEbookDisponivel = async () => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlQtdEbookDisponivel, config.PaginaERDB, null);
        return result;

    } catch (error) {
        throw error
    }
}



exports.listarEbooksDisponiveis = async () => {
    try {

        const result = await mysql.consultar(query.sqlListaEbook, config.SolucoesDigitaisMYSQL);

        return result;

    } catch (error) {
        throw error
    }
}

exports.consultarEbookPorIdProduto = async (idProduto) => {
    try {

        const result = await mysql.consultar(query.sqlConsultarEbook, config.SolucoesDigitaisMYSQL, {IdConteudoApoio: idProduto});

        return result;

    } catch (error) {
        throw error
    }
}
