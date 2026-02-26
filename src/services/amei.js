'use strict'
const axios = require('axios');
const config = require('../config');

let userInfo = async (token) => { 
    try {
        
        const retorno = await axios({
            method: 'post',
            url: `${config.AMEI.baseUrl}/realms/${config.AMEI.realm}/protocol/openid-connect/userinfo`,
            headers: {
                Authorization: `Bearer ${token}`   
            },
            validateStatus: function () {
                return true; }
        });
                
        return retorno;
        
    } catch (error) {
        throw error
    }
}

exports.habilitado =() => {
    return  config.AMEI.habilitado;
 } 

exports.validarToken = async (token) => {
    try {
        const retorno = await userInfo(token);
        return retorno.status == 200 ? true: false;
    } catch (error) {
        throw error;
    }
}

let userExternoInfo = async (token) => { 
    try {
        const retorno = await axios({
            method: 'post',
            url: `${config.AMEI.baseUrlExterno}/realms/${config.AMEI.realm_externo}/protocol/openid-connect/userinfo`,
            headers: {
                Authorization: `Bearer ${token}`   
            },
            validateStatus: function () {
                return true; }
        });
                
        return retorno;
        
    } catch (error) {        
        throw error
    }
}

exports.validarTokenExterno = async (token) => {
    try {
        const retorno = await userExternoInfo(token);
        return retorno.status == 200 ? true: false;
    } catch (error) {
        throw error;
    }
}

exports.obterDadosUsuario = async (token) => {
    try {
        const retorno = await userExternoInfo(token);
        return retorno.data;
    } catch (error) {
        throw error;
    }
}