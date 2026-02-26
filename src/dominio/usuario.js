'use strict'
const usuario = require("../repositories/usuario");

exports.consultar = async (login) => {
    try {
        const result = await usuario.consultar(login);
        return result[0];

    } catch (error) {
        throw error
    }
}

exports.inserir = async (login, idLocal) => {
    try {
        await usuario.inserir(login,idLocal);
    } catch (error) {
        throw error
    }
}
