'use strict'
const banner = require("../repositories/banner");

exports.incluir = async (novoBanner) => {
    try {
        const result = await banner.incluir(novoBanner)
        return result;

    } catch (error) {
        throw error
    }
}

exports.atualizar = async (alteracao) => {
    try {
        alteracao = {
            Titulo: alteracao.titulo,
            Link: alteracao.link,
            Imagem: alteracao.imagem,
            Situacao: alteracao.situacao ? alteracao.situacao : false,
            Ordenacao: alteracao.ordenacao,
            DataInicio: alteracao.dataInicio || null,
            DataFim: alteracao.dataFim || null,
            IdBanner: alteracao.idBanner
        }
        const result = await banner.alterar(alteracao);
        return result;

    } catch (error) {
        throw error
    }
}

exports.listar = async (idLocal) => {
    try {
        const result = await banner.listar(idLocal);
        return result;

    } catch (error) {
        throw error
    }
}

exports.excluir = async (idBanner) => {
    try {        
        const result = await banner.excluir(idBanner);            
        return result;
    } catch (error) {
        throw error
    }
}

exports.publicar = async (idBanner) => {
    try {        
        let ordenacao = 0;

        let banner = await this.consultar(idBanner);
        if(!banner) throw  "Banner não encontrado";
        banner.situacao = !banner.situacao;

        if(banner.situacao)
           ordenacao = await this.consultarMaxOrdenacao(banner.idLocal) 
        ordenacao && ordenacao > 0 ? banner.ordenacao = ordenacao + 1 : ordenacao
        
        if (!banner.situacao) {
            banner.dataInicio = null
            banner.dataFim = null
        }

        let result = await this.atualizar(banner);
        
        return result;
    } catch (error) {
        throw error
    }
}

exports.consultar = async (idBanner) => {
    try {
        const result = await banner.consultar(idBanner);
        return result[0];

    } catch (error) {
        throw error
    }
}

exports.priorizarBanner = async (bannerOrdenar) => {
    try {
        const result = await banner.priorizarBanner(bannerOrdenar);
        return result
    } catch (error) {
        throw error
    }
}

exports.consultarMaxOrdenacao = async (idLocal) => {
    try {
        const result = await banner.consultarMaxOrdenacao(idLocal);
        return result[0];

    } catch (error) {
        throw error
    }
}