'use strict'
const mysql = require("../services/mysql");
const query = require("../scripts/solucoesDigitais");
const config = require("../config");

exports.consultar = async () => {
    try {    
        
        const result = await mysql.consultar(query.sqlConsultarAcesso,config.SolucoesDigitaisMYSQL, {});
        return result;

    } catch (error) {
        throw error
    }
}



