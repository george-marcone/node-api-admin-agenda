'use strict'
const mysql = require("../services/mysql");
const queryAgendaER = require("../scripts/paginaER");
const config = require("../config");

exports.acessos = async (idLocal, mes, ano) => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlConsultarAcessosMensais,config.PaginaERDB, {IdLocal: idLocal, mes, ano});
        return result;

    } catch (error) {
        throw error
    }
}

exports.listar = async (idLocal) => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlListarAcessosMensais, config.PaginaERDB, {IdLocal: idLocal});
        return result;

    } catch (error) {
        throw error
    }
}



exports.listarTodos = async (mes, ano) => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlListarTodosAcessosMensais, config.PaginaERDB, {mes, ano});
        return result;

    } catch (error) {
        throw error
    }
}

exports.banner = async () => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlBannerAgrupados, config.PaginaERDB, {});
        return result;

    } catch (error) {
        throw error
    }
}

exports.bannerLocalPublicados = async () => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlLocaisBannersNaoPublicados, config.PaginaERDB, {});
        return result;

    } catch (error) {
        throw error
    }
}


exports.consultoria = async () => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlConsultoriaAgrupados, config.PaginaERDB, {});
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultoriaLocalPublicadas = async () => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlLocaisConsultoriasNaoPublicadas, config.PaginaERDB, {});
        return result;

    } catch (error) {
        throw error
    }
}

exports.cursos = async () => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlCursosAgrupados, config.PaginaERDB, {});
        return result;

    } catch (error) {
        throw error
    }
}

exports.cursosLocalPublicadas = async () => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlLocaisCursosNaoPublicadas, config.PaginaERDB, {});
        return result;

    } catch (error) {
        throw error
    }
}

exports.download = async () => {
    try {    
        
        const result = await mysql.consultar(queryAgendaER.sqlDownloadAgrupados, config.PaginaERDB, {});
        return result;

    } catch (error) {
        throw error
    }
}




