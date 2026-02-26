'use strict'
const config = require("../config");
const mysql = require("../services/mysql");
const query = require("../scripts/paginaER");


exports.consultar = async (login) => {
    try {
        const result = await mysql.listar(query.sqlConsultarUsuario, config.PaginaERDB, { Login: login });
        return result;
    } catch (error) {
        throw error
    }
}

exports.inserir = async(login, idLocal) => {
    try {      
         await mysql.incluir(query.sqlIncluirUsuario,config.PaginaERDB,{ Login: login, Idlocal: idLocal } );   
    } catch (error) {
        throw error
    }
}
