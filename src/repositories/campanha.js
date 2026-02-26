'use strict'
const mysql = require("../services/mysql");
const query = require("../scripts/paginaER");
const config = require("../config");


exports.criar = async (item) => {
    try {      
         const result = await mysql.incluir(query.sqlIncluirCampanha, config.PaginaERDB, { 
            IdLocal: item.idLocal, 
            IdKit: item.idExecucaoKit, 
            Nome: item.nome,
            Cor: item.cor,
            Tag: item.tag,
            Img: item.img,
            Situacao: item.situacao
        });   
        return result;
        } catch (error) {
        throw error
    }
}

exports.listar = async (idLocal) => {
    try {

        const result = await mysql.listar(query.sqlListarCampanha, config.PaginaERDB, { IdLocal: idLocal });
        return result;

    } catch (error) {
        throw error
    }
}


exports.consultar = async (idCampanha) => {
    try {

        const result = await mysql.listar(query.sqlConsultarCampanha, config.PaginaERDB, { IdCampanha: idCampanha });
        return result[0];

    } catch (error) {
        throw error
    }
}

exports.atualizar = async (item) => {
    try {

        const result = await mysql.incluir(query.sqlAtualizarCampanha, config.PaginaERDB, item);
        return result;

    } catch (error) {
        throw error
    }
}

exports.publicar = async (idCampanha) => {
    try {

        const campanha = await mysql.listar(query.sqlConsultarCampanha, config.PaginaERDB, { IdCampanha: idCampanha });
        if(campanha.length){
            const result = await mysql.incluir(query.sqlPublicarCampanha, config.PaginaERDB, { Situacao: campanha[0].ativar == 1 ? 0 : 1, IdCampanha: idCampanha });
            return result;
        }

    } catch (error) {
        throw error
    }
}

exports.excluir = async (idCampanha) => {
    try {

        const result = await mysql.incluir(query.sqlExcluirCampanha, config.PaginaERDB, { IdCampanha: idCampanha });
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultarPorKit = async (idExecucaoKit) => {
    try {

        const result = await mysql.listar(query.sqlConsultarPorKitCampanha, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit });
        return result;

    } catch (error) {
        throw error
    }
}

exports.listarCampanhaPorStatus = async (idLocal) => {
    try {

        const result = await mysql.listar(query.sqlListarCampanhaPorStatus, config.PaginaERDB, { IdLocal: idLocal });
        return result;

    } catch (error) {
        throw error
    }
}