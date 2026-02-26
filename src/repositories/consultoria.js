'use strict'
const mysql = require("../services/mysql");
const query = require("../scripts/solucoesDigitais");
const config = require("../config");
const queryAgendaER = require("../scripts/paginaER");

exports.listar = async (idLocal) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlListarConsultoria, config.PaginaERDB, { IdLocalAtendimento: idLocal});
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultar = async (idConsultoria) => {
    try {

        const result = await mysql.consultar(query.sqlConsultarConsultoria, config.SolucoesDigitaisMYSQL, { IdProduto: idConsultoria });

        return result;

    } catch (error) {
        throw error
    }
}

exports.disponibilizar = async (idLocal, idConsultoria,  exibirFormulario = false, divulgarMarketing = false) => {
    try {

        const consulta = await mysql.consultar(queryAgendaER.sqlConsultarDisponibidadeConsultoria, config.PaginaERDB, { IdConsultoria: idConsultoria, Idlocal: idLocal });
        if (consulta.length > 0){
            await mysql.incluir(queryAgendaER.sqlExcluirDisponibilidadeConsultoria, config.PaginaERDB, { IdConsultoria: idConsultoria, Idlocal: idLocal });
            await mysql.incluir(queryAgendaER.sqlExcluirInfoAdicionaisConsultoria, config.PaginaERDB, { IdProdutoConsultoria: idConsultoria, IdLocalAtendimento: idLocal });
        }else{
            await mysql.incluir(queryAgendaER.sqlIncluirDisponibilidadeConsultoria, config.PaginaERDB, { IdConsultoria: idConsultoria, Idlocal: idLocal, ExibirFormulario: exibirFormulario, DivulgarMarketing: divulgarMarketing });
        }
    } catch (error) {
        throw error
    }
}

exports.destaque = async (idLocal, idConsultoria, destaque) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlAlterarConsultoriaDestaque, config.PaginaERDB, { Destaque: destaque, IdLocal: idLocal, IdConsultoria: idConsultoria });
        return result;

    } catch (error) {
        throw error
    }
}


exports.ordenacao = async (idLocal, idConsultoria, ordenacao) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlAlterarConsultoriaOrdenacao, config.PaginaERDB, { Ordenacao: ordenacao, IdLocal: idLocal, IdConsultoria: idConsultoria });
        return result;
		
    } catch (error) {
        throw error
    }
}

exports.listarDisponiveis = async (idLocal) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlListarConsultoriasDisponiveis, config.PaginaERDB, { IdLocal: idLocal });
        return result;
    } catch (error) {
        throw error
    }
}

exports.listarInteressados = async (idLocal) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlListarInteressados, config.PaginaERDB, { IdLocal: idLocal });
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultarInteressado = async (idInteracao) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlConsultarInteressadoPorId, config.PaginaERDB, { IdInteracao: idInteracao });
		return result;
		
    } catch (error) {
        throw error
    }
}

exports.excluirInteressado = async (idInteracao, faraConsultoria) => {
    try {

        const result = await mysql.alterar(queryAgendaER.sqlExcluirInteressado, config.PaginaERDB, { FaraConsultoria: faraConsultoria, IdInteracao: idInteracao });		
		return result;
		
    } catch (error) {
        throw error
    }
}		

exports.cadastrarInteressado = async (interessado) => {
    try {

        const result = await mysql.incluir(queryAgendaER.sqlCadastrarInteressado, config.PaginaERDB, {
            IdLocal: interessado.idLocal,
            IdProduto: interessado.idProduto,
            Nome: interessado.nome,
            Celular: interessado.telefone,
            Email: interessado.email, 
            Motivo: interessado.motivo
        });		
		return result;
		
    } catch (error) {
        throw error
    }
}

exports.consultarMaisInfoConsultoria = async (idConsultoria, idLocal) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlConsultaInfoAdicionaisConsultoria, config.PaginaERDB, { IdProdutoConsultoria: idConsultoria, IdLocalAtendimento: idLocal });

        return result;

    } catch (error) {
        throw error
    }
}

exports.inserirMaisInfoConsultoria = async (idConsultoria, idLocal, informacoesAdicionais) => {
    let retorno = false;
    try {
        const result = await mysql.incluir(queryAgendaER.sqlInserirConsultoriaInfoAdicionais, config.PaginaERDB, {idConsultoria, idLocal, informacoesAdicionais});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.editarMaisInfoConsultoria = async (idConsultoria, idLocal, informacoesAdicionais) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.sqlAlterarInfoAdicionaisConsultoria, config.PaginaERDB, {informacoesAdicionais, idConsultoria, idLocal});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.editarConsultoriaDisponivel = async (idConsultoria, idLocal, exibirFormulario) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.sqlAlterarConsultoriaDisponivel, config.PaginaERDB, {exibirFormulario, idLocal, idConsultoria});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.consultarDisponivel = async (idLocal, idConsultoria) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlConsultarDisponibidadeConsultoria, config.PaginaERDB,{ IdConsultoria: idConsultoria, Idlocal: idLocal });
        return result;
    } catch (error) {
        throw error
    }
}

exports.retornaConsultoriaEditada = async (idLocal, idConsultoria) => {
    try {
        const result = await mysql.consultar(query.sqlRetornaConsultoriaEditada, config.PaginaERDB, { IdLocal: idLocal, IdConsultoria: idConsultoria });
        return result;
    } catch (error) {
        throw error
    }
}

exports.marketing = async (idLocal, idConsultoria, divulgarMarketing = false) => {
    try {

        const consulta = await mysql.consultar(queryAgendaER.sqlConsultarDisponibidadeConsultoria, config.PaginaERDB, { IdConsultoria: idConsultoria, Idlocal: idLocal });
        if (consulta.length > 0){
            await mysql.incluir(queryAgendaER.sqlEditarMarketingConsultoria, config.PaginaERDB, { DivulgarMarketing: divulgarMarketing, IdConsultoria: idConsultoria, Idlocal: idLocal });
        }
        return true;
    } catch (error) {
        throw error
    }
}

exports.listarMarketingDivulgar = async () => {
    try {
        const result = await mysql.consultar(queryAgendaER.sqlMarketingDivulgar, config.PaginaERDB);
        return result;
    } catch (error) {
        throw error
    }
}

exports.qtdConcultoriaDisponivel = async (idLocal) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlQtdConsultoriaDisponivel, config.PaginaERDB, { IdLocal: idLocal});
        return result;

    } catch (error) {
        throw error
    }
}