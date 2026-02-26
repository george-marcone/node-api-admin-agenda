'use strict'
const estatisticas = require("../repositories/estatisticas");

exports.consultar = async (idLocal, mes, ano) => {
    try {
        const result = await estatisticas.acessos(idLocal, mes, ano);
        return result;

    } catch (error) {
        throw error
    }
} 

exports.listar = async (idLocal) => {
    try {
        const result = await estatisticas.listar(idLocal);
        return result;

    } catch (error) {
        throw error
    }
} 

exports.listarTodos = async (mes, ano) => {
    try {
        const result = await estatisticas.listarTodos(mes, ano);
        return result;

    } catch (error) {
        throw error
    }
} 

exports.banner = async () => {
    try {
        const result = await estatisticas.banner();
        return result;

    } catch (error) {
        throw error
    }
} 

exports.bannerLocalPublicados = async () => {
    try {
        const result = await estatisticas.bannerLocalPublicados();
        return result;

    } catch (error) {
        throw error
    }
} 

exports.consultoria = async () => {
    try {
        const result = await estatisticas.consultoria();
        return result;

    } catch (error) {
        throw error
    }
} 

exports.consultoriaLocalPublicados = async () => {
    try {
        const result = await estatisticas.consultoriaLocalPublicadas();
        return result;

    } catch (error) {
        throw error
    }
} 

exports.cursos = async () => {
    try {
        const result = await estatisticas.cursos();
        return result;

    } catch (error) {
        throw error
    }
} 

exports.cursosLocalPublicados = async () => {
    try {
        const result = await estatisticas.cursosLocalPublicadas();
        return result;

    } catch (error) {
        throw error
    }
} 

exports.download = async () => {
    try {
        const result = await estatisticas.download();
        return result;

    } catch (error) {
        throw error
    }
} 
