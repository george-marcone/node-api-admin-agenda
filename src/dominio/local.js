'use strict'
const cep = require("../repositories/local");
const local = require("../repositories/local");

exports.listarDisponiveisPorMatriz = async (idLocal) => {
    try {
        const result = await local.listarDisponiveisPorMatriz(idLocal);
        return result;

    } catch (error) {
        throw error
    }
}

exports.inativar = async (idLocal) => {
    try {
        const result = await local.inativar(idLocal);
        return result;

    } catch (error) {
        throw error
    }
}

exports.pesquisar = async (Cep) => {
    try {

        let objeto = {};
        let result = null;

        if (Cep) {
            result = await cep.consultarPorCep(Cep);
            objeto.idlocal = result[0].idLocal;
        }

        return objeto;
    } catch (error) {
        throw error
    }
}

exports.listarERs = async () => {
    try {
        const result = await local.listar([2, 3]);
        return result.map(item => ({
            ...item,
            // a propriedade exibir vai ser false, para a unidade 49
            exibir: true
        }));
    } catch (error) {
        throw error;
    }
}

/// Realiza a consulta de dados do Sebrae Aqui a partir do slug registrado
exports.consultarSebraeAquiPorSlug = async (slug) => {
    try {

        const consulta = await local.consultarSebraeAquiPorSlug(slug);
        return consulta[0];
    }
    catch (error) {
        throw error;
    }
}

exports.consultar = async (idLocal) => {
    try {
        const consulta = await local.consultar(idLocal);
        return consulta[0];

    } catch (error) {
        throw error
    }
}

exports.listarPorMatriz = async (idLocal) => {
    try {
        const result = await local.listarPorMatriz(idLocal);
        return result;

    } catch (error) {
        throw error
    }
}


/*Contato*/

exports.atualizarContato = async (contato) => {
    try {
        const result = await local.atualizarContato(contato);
        return result;

    } catch (error) {
        throw error
    }
}

/*Endereço*/

exports.cadastrarEndereco = async (endereco) => {
    try {
        const result = await local.cadastrarEndereco(endereco);
        return result;

    } catch (error) {
        throw error
    }
}

exports.atualizarEndereco = async (endereco) => {
    try {
        const result = await local.atualizarEndereco(endereco);
        return result;

    } catch (error) {
        throw error
    }
}

/*Horario*/

exports.atualizarHorario = async (horario) => {
    try {
        const result = await local.atualizarHorario(horario);
        return result;

    } catch (error) {
        throw error
    }
}

exports.atualizarServicos = async (servicoOferecido) => {
    try {
        const result = await local.atualizarServicos(servicoOferecido);
        return result;

    } catch (error) {
        throw error
    }
}

exports.atualizarImagem = async (imagem) => {
    try {
        const result = await local.atualizarImagem(imagem);
        return result;

    } catch (error) {
        throw error
    }
}

exports.atualizarAviso = async (dados) => {
    try {
        const result = await local.atualizarAviso(dados);
        return result;

    } catch (error) {
        throw error
    }
}

exports.atualizarSlug = async (dados) => {
    try {
        const result = await local.atualizarSlug(dados);
        return result;

    } catch (error) {
        throw error
    }
}


exports.atualizarEmailAlerta = async (dados) => {
    try {
        const result = await local.atualizarEmailAlerta(dados);
        return result;

    } catch (error) {
        throw error
    }
}


