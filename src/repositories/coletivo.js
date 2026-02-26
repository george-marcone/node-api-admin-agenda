'use strict'
const mysql = require("../services/mysql");
const query = require("../scripts/solucoesDigitais");
const config = require("../config");
const queryAgendaER = require("../scripts/paginaER");

exports.listar = async () => {
    try {

        const result = await mysql.consultar(query.sqlListarColetivo, config.SolucoesDigitaisMYSQL);
        return result;

    } catch (error) {
        throw error
    }
}

exports.listarPorLocal = async (idLocal) => {
    try {
        let coletivos = await mysql.consultar(queryAgendaER.sqlListarColetivoPorLocal, config.PaginaERDB, { idlocal: idLocal });
        //Lista os cursos que são da Central de Atendimento
        if (parseInt(idLocal) != config.Parametros.idCentralAtendimento) {
            //Limita o número de eventos da central de atendimento
            let consulta = config.Parametros.hasOwnProperty('limiteCentralAtendimento') ? queryAgendaER.sqlListarColetivoPorLocal + ' limit ' + config.Parametros.limiteCentralAtendimento : queryAgendaER.sqlListarColetivoPorLocal;
            const coletivosCentralAtendimento = await mysql.consultar(consulta, config.PaginaERDB, { idlocal: config.Parametros.idCentralAtendimento });
            if (coletivosCentralAtendimento.length) coletivos = coletivos.concat(coletivosCentralAtendimento);
        }
        return coletivos;
    } catch (error) {
        throw error
    }
}

// Inclui/Remove a disponibilização de um curso para um Local Específico
exports.disponibilizar = async (idLocal, idAtendimento, exclusivoPJ, divulgarMarketing) => {
    try {
        const consulta = await mysql.consultar(queryAgendaER.sqlConsultarDisponibidadeColetivo, config.PaginaERDB, { idAtendimento: idAtendimento, idlocal: idLocal});
        if (consulta.length){
            await mysql.incluir(queryAgendaER.sqlExcluirDisponibilidadeColetivo, config.PaginaERDB, { IdAtendimento: idAtendimento, Idlocal: idLocal });   
            await mysql.incluir(queryAgendaER.sqlExcluirInfoAdicionaisColetivo, config.PaginaERDB, { IdAtendimento: idAtendimento, IdLocalAtendimento: idLocal });
        
            if(idLocal == config.Parametros.idCentralAtendimento){
                const result = await mysql.consultar(queryAgendaER.sqlListarLocaisPorColetivo, config.PaginaERDB, { idAtendimento });
    
                if(result && result.length){
                    for(const item of result){
                        await mysql.incluir(queryAgendaER.sqlExcluirDisponibilidadeColetivo, config.PaginaERDB, { idAtendimento: idAtendimento, Idlocal: item.idLocal });
                        await mysql.incluir(queryAgendaER.sqlExcluirInfoAdicionaisColetivo, config.PaginaERDB, { IdAtendimento: idAtendimento, IdLocalAtendimento: item.idLocal });
                    }	
                }            
            }
            
        } else {
            await mysql.incluir(queryAgendaER.sqlIncluirDisponibilidadeColetivo, config.PaginaERDB, { idAtendimento: idAtendimento, idlocal: idLocal, exclusivoPJ: exclusivoPJ, DivulgarMarketing: divulgarMarketing});
        }
    } catch (error) {
        throw error
    }
}

//Lista quais atendimentos estão disponíveis por local
exports.listarDisponiveis = async (idLocal) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlListarDisponibidadeColetivo, config.PaginaERDB, { IdLocal: idLocal });
        return result;

    } catch (error) {
        throw error
    }
}

exports.atualizarPJ = async (idLocal, idAtendimento, exclusivoPJ) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.sqlAlterarExclusivoPJColetivo, config.PaginaERDB, { ExclusivoPJ: exclusivoPJ ? exclusivoPJ : false, Idlocal: idLocal, IdAtendimento: idAtendimento });
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno
}

exports.destacarCurso = async (cursoDestaque) => {
    let retorno = false;     
    let ordenacao = 0;

    if(cursoDestaque.Destaque == 1)
       ordenacao = await mysql.consultar(queryAgendaER.sqlConsultarOrdenacaoColetivoDisponivel, config.PaginaERDB, { IdLocal: cursoDestaque.IdLocal }) 
    ordenacao && ordenacao.length > 0? cursoDestaque.Ordenacao = ordenacao[0].Ordenacao + 1 : 0
    try {
        const result = await mysql.alterar(queryAgendaER.sqlAlterarCursoDestaqueColetivo, config.PaginaERDB, cursoDestaque);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.priorizarCurso = async (cursoOrdenar) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.sqlAlterarCursoOrdenacaoColetivo, config.PaginaERDB, cursoOrdenar);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.consultarMaisInformacoes = async (idAtendimento, idLocalAtendimento) => {
    
    try {
        const result = await mysql.consultar(queryAgendaER.sqlConsultaInfoAdicionaisColetivo, config.PaginaERDB, {idAtendimento, idLocalAtendimento});
        return result;
    } catch (error) {
        throw error
    }
}

exports.editarMaisInformacoes = async (idAtendimento, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento) => {
    let retorno = false;
    try {
        let result
        
        if (informacoesAdicionais == '' && descrComplementoTitulo == '') {
            result = await mysql.incluir(queryAgendaER.sqlExcluirInfoAdicionaisColetivo, config.PaginaERDB, { IdAtendimento: idAtendimento, IdLocalAtendimento: idLocalAtendimento });            
        } else {
            result = await mysql.alterar(queryAgendaER.sqlAlterarInfoAdicionaisColetivo, config.PaginaERDB, {informacoesAdicionais, descrComplementoTitulo, idAtendimento, idLocalAtendimento});            
        }

        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.marketing = async (idAtendimento, idLocal, divulgarMarketing) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.sqlAlterarMarketingColetivo, config.PaginaERDB, {divulgarMarketing, idAtendimento, idLocal});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

//Lista quais atendimentos estão disponíveis por local
exports.consultarInformacoesAtualizadas = async (idAtendimento, idLocal) => {
    try {
        const consulta = await mysql.consultar(queryAgendaER.sqlConsultarDisponibidadeColetivo, config.PaginaERDB, { idAtendimento: idAtendimento, idlocal: idLocal});
        return consulta;

    } catch (error) {
        throw error
    }
}

exports.consultar = async (idAtendimento) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlConsultarColetivo, config.PaginaERDB, { IdAtendimento: idAtendimento });
        return result;

    } catch (error) {
        throw error
    }
}

exports.inserirMaisInformacoes = async (idAtendimento, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento) => {
    let retorno = false;
    try {
        const result = await mysql.incluir(queryAgendaER.sqlInserirInfoAdicionaisColetivo, config.PaginaERDB, {idAtendimento, idLocalAtendimento, informacoesAdicionais, descrComplementoTitulo});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.consultarQtdColetivoPresencial = async (idLocal) => {
    try {

        const consulta = await mysql.consultar(queryAgendaER.sqlQtdColetivoPresencialDisponivel, config.PaginaERDB, {IdLocalAtendimento: idLocal });        
        return consulta;

    } catch (error) {
        throw error
    }
}

exports.consultarQtdColetivoOnline = async (idLocal) => {
    try {

        let coletivos = await mysql.consultar(queryAgendaER.sqlQtdColetivoOnlineDisponivel, config.PaginaERDB, { IdLocalAtendimento: idLocal });        
        return coletivos;

    } catch (error) {
        throw error
    }
}

exports.listarPresencialPorLocal = async (idLocal) => {
    try {
        let coletivos = await mysql.consultar(queryAgendaER.sqlListarColetivoPresencialPorLocal, config.PaginaERDB, { IdLocalAtendimento: idLocal });
        //Lista os cursos que são da Central de Atendimento
        return coletivos;
    } catch (error) {
        throw error
    }
}

exports.listarOnlinePorLocal = async (idLocal) => {
    try {
        let coletivos = await mysql.consultar(queryAgendaER.sqlListarColetivoOnlinePorLocal, config.PaginaERDB, { IdLocalAtendimento: idLocal });
        //Lista os cursos que são da Central de Atendimento
        return coletivos;
    } catch (error) {
        throw error
    }
}

exports.consultarQtdColetivoPresencialSebraeAqui = async (idLocalSebraeAqui) => {
    try {

        const consulta = await mysql.consultar(queryAgendaER.sqlQtdColetivoPresencialDisponivelSebraeAqui, config.PaginaERDB, {IdLocalAtendimentoDivisao: idLocalSebraeAqui });        
        return consulta;

    } catch (error) {
        throw error
    }
}

exports.consultarQtdColetivoOnlineSebraeAqui = async (idLocalSebraeAqui) => {
    try {

        const consulta = await mysql.consultar(queryAgendaER.sqlQtdColetivoOnlineDisponivelSebraeAqui, config.PaginaERDB, {IdLocalAtendimentoDivisao: idLocalSebraeAqui });        
        return consulta;

    } catch (error) {
        throw error
    }
}

//Lista quais atendimentos estão disponíveis por local
exports.listarDisponiveisIdProduto = async (idProduto) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlListarDisponibidadeColetivoProduto, config.PaginaERDB, { IdProduto: idProduto });
        return result;

    } catch (error) {
        throw error
    }
}


exports.listarPorIdProduto = async (idProduto) => {
    try {
        let coletivos = await mysql.consultar(queryAgendaER.sqlListarColetivoPorProduto, config.PaginaERDB, { IdProduto: idProduto });
        
        return coletivos;
    } catch (error) {
        throw error
    }
}

exports.consultarProduto = async (idProduto) => {
    try {
        let coletivos = await mysql.consultar(query.sqlConsultarProduto, config.PaginaERDB, { IdProduto: idProduto });
        
        return coletivos;
    } catch (error) {
        throw error
    }
}

exports.listarColetivoPersonalizados = async () => {
    try {
        let coletivos = await mysql.consultar(queryAgendaER.listarColetivosPersonalizados, config.PaginaERDB);
        return coletivos;
    } catch (error) {
        throw error
    }
}

exports.consultarColetivoPersonalizado = async (idProduto) => {
    try {
        let coletivos = await mysql.consultar(queryAgendaER.consultaColetivoPersonalizado, config.PaginaERDB, { IdProduto: idProduto });
        
        return coletivos[0];
    } catch (error) {
        throw error
    }
}

exports.inserirColetivoPersonalizado = async (idProduto, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo) => {
    let retorno = false;
    try {
        const result = await mysql.incluir(queryAgendaER.inserirColetivoPersonalizado, config.PaginaERDB, {idProduto, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.alterarColetivoPersonalizado = async (idProduto, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo) => {
    let retorno = false;
    try {
        const result = await mysql.incluir(queryAgendaER.alterarColetivoPersonalizado, config.PaginaERDB, {ImagemGrande: imagemGrande, ImagemMedia: imagemMedia, ImagemPequena: imagemPequena, Video: video, SituacaoVideo: situacaoVideo, IdProduto: idProduto});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.excluirColetivoPersonalizado = async (idProduto) => {
    try {
        await mysql.incluir(queryAgendaER.excluirColetivoPersonalizado, config.PaginaERDB, {IdProduto: idProduto});
        return true;
    } catch (error) {
        throw error
    }
}

exports.cadastrarFaqProduto = async (dados) => {
    let retorno = false;
    try {
        const result = await mysql.incluir(queryAgendaER.cadastrarFaqProduto, config.PaginaERDB, dados);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.alterarFaqProduto = async (registro) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.atualizarFaqProdutoIdFaq, config.PaginaERDB, registro);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.excluirFaqProdutoPorIdFaq = async (idFaqProduto) => {
    try {
        await mysql.incluir(queryAgendaER.excluirFaqProdutoPorIdFaq, config.PaginaERDB, {IdFaqProduto: idFaqProduto});
        return true;
    } catch (error) {
        throw error
    }
}

exports.consultarFaqProdutoPorIdFaq = async (idFaqProduto) => {
    try {
        let faq = await mysql.consultar(queryAgendaER.consultarFaqProdutoPorIdFaq, config.PaginaERDB, { IdFaqProduto: idFaqProduto });
        
        return faq[0];
    } catch (error) {
        throw error
    }
}


exports.consultarFaqPorIdProduto = async (idProduto) => {
    try {
        let faq = await mysql.consultar(queryAgendaER.consultarFaqPorIdProduto, config.PaginaERDB, { IdProduto: idProduto });        
        return faq;
    } catch (error) {
        throw error
    }
}

exports.excluirFaqProdutoPorIdProduto = async (idProduto) => {
    try {
        await mysql.incluir(queryAgendaER.excluirFaqProdutoPorIdProduto, config.PaginaERDB, {IdProduto: idProduto});
        return true;
    } catch (error) {
        throw error
    }
}
