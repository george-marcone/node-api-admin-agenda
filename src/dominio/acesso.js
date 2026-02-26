'use strict'
const acesso = require("../repositories/acesso");

exports.consultar = async () => {
    try {
        const result = await acesso.consultar();
        return result;

    } catch (error) {
        throw error
    }
} 