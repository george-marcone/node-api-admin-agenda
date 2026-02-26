'use strict'
const mysql = require("../services/mysql");
const query = require("../scripts/solucoesDigitais");
const queryAgendaER = require("../scripts/paginaER");
const config = require("../config");


exports.listar = async () => {
    try {

        const result = await mysql.consultar(query.sqlListarExecucaoKit, config.SolucoesDigitaisMYSQL);
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultar = async (idExecucaoKit) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlConsultarExecucaoKit, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit });
        return result;

    } catch (error) {
        throw error
    }
}

exports.listarPorLocal = async (idLocal) => {
    try {

        let execucaoKits = await mysql.consultar(queryAgendaER.sqlListarExecucaoKitPorLocal, config.PaginaERDB, { IdLocal: idLocal });
        //Lista os cursos que são da Central de Atendimento
        if (parseInt(idLocal) != config.Parametros.idCentralAtendimento) {
            //Limita o número de eventos da central de atendimento
            let consulta = config.Parametros.hasOwnProperty('limiteCentralAtendimento') ? queryAgendaER.sqlListarExecucaoKitPorLocal + ' limit ' + config.Parametros.limiteCentralAtendimento : queryAgendaER.sqlListarExecucaoKitPorLocal;
            const execucaoKitsCentralAtendimento = await mysql.consultar(consulta, config.PaginaERDB, { IdLocal: config.Parametros.idCentralAtendimento });
            if (execucaoKitsCentralAtendimento.length) execucaoKits = execucaoKits.concat(execucaoKitsCentralAtendimento);
        }

        return execucaoKits;

    } catch (error) {
        throw error
    }
}

// Inclui/Remove a disponibilização de um curso para um Local Específico
exports.disponibilizar = async (idLocal, idExecucaoKit, exclusivoPJ, divulgarMarketing) => {
    try {
        const consulta = await mysql.consultar(queryAgendaER.sqlConsultarDisponibidadeExecucaoKit, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit, Idlocal: idLocal });

        if (consulta.length) {
            await mysql.incluir(queryAgendaER.sqlExcluirDisponibilidadeExecucaoKit, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit, Idlocal: idLocal });            
            await mysql.incluir(queryAgendaER.sqlExcluirInfoAdicionaisExecucaoKit, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit, IdLocalAtendimento: idLocal });
        
            // Se o idLocal for a central de cursos online, remover todos todos os cursos online da central publicados pelos outros ERs
            if(idLocal == config.Parametros.idCentralAtendimento){
                const result = await mysql.consultar(queryAgendaER.sqlListarLocaisPorExecucaoKit, config.PaginaERDB, { idExecucaoKit });
                
                if (result && result.length) {
                    for (const item of result) {
                        await mysql.incluir(queryAgendaER.sqlExcluirDisponibilidadeExecucaoKit, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit, Idlocal: item.idLocal });
                        await mysql.incluir(queryAgendaER.sqlExcluirInfoAdicionaisExecucaoKit, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit, IdLocalAtendimento: item.idLocal });
                    }
                }    
            }
        }        
        else{
            await mysql.incluir(queryAgendaER.sqlIncluirDisponibilidadeExecucaoKit, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit, Idlocal: idLocal, ExclusivoPJ: exclusivoPJ ? exclusivoPJ :false, DivulgarMarketing: divulgarMarketing});
        }
    } catch (error) {
        throw error
    }
}


//Lista quais atendimentos estão disponíveis por local
exports.listarDisponiveis = async (idLocal) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlListarDisponibidadeExecucaoKit, config.PaginaERDB, { IdLocal: idLocal });
        return result;

    } catch (error) {
        throw error
    }
}

exports.atualizarPJ = async (idLocal, idExecucaoKit, exclusivoPJ) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.sqlAlterarExclusivoPJExecucaoKit, config.PaginaERDB, {ExclusivoPJ: exclusivoPJ ?  exclusivoPJ: false, Idlocal: idLocal, IdExecucaoKit: idExecucaoKit });
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.destacarCurso = async (cursoDestaque) => {
    let retorno = false;
    let ordenacao = 0;
    if(cursoDestaque.Destaque == 1)
       ordenacao = await mysql.consultar(queryAgendaER.sqlConsultarOrdenacaoExecucaoKitDisponivel, config.PaginaERDB, { IdLocal: cursoDestaque.IdLocal }) 
    ordenacao && ordenacao.length > 0 ? cursoDestaque.Ordenacao = ordenacao[0].Ordenacao + 1 : 0    
    try {
        const result = await mysql.alterar(queryAgendaER.sqlAlterarCursoDestaqueExecucaoKit, config.PaginaERDB, cursoDestaque);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.priorizarCurso = async (cursoOrdenar) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.sqlAlterarCursoOrdemExecucaoKit, config.PaginaERDB, cursoOrdenar);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.consultarMaisInformacoes = async (idExecucaoKit, idLocalAtendimento) => {
    
    try {
        const result = await mysql.consultar(queryAgendaER.sqlConsultaInfoAdicionaisExecucaoKit, config.PaginaERDB, {idExecucaoKit, idLocalAtendimento});
        return result;
    } catch (error) {
        throw error
    }
}

exports.editarMaisInformacoes = async (idExecucaoKit, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento) => {
    let retorno = false;
    try {
        let result

        if (informacoesAdicionais == '' && descrComplementoTitulo == '') {
            result = await mysql.incluir(queryAgendaER.sqlExcluirInfoAdicionaisExecucaoKit, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit, IdLocalAtendimento: idLocalAtendimento });            
        } else {
            result = await mysql.alterar(queryAgendaER.sqlAlterarInfoAdicionaisExecucaoKit, config.PaginaERDB, { informacoesAdicionais, descrComplementoTitulo, idExecucaoKit, idLocalAtendimento });            
        }        

        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.marketing = async (idExecucaoKit, idLocalAtendimento, divulgarMarketing) => {
    try {

        const result = await mysql.alterar(queryAgendaER.sqlAlterarMarketingExecucaoKit, config.PaginaERDB, {divulgarMarketing, idExecucaoKit, idLocalAtendimento});
        return result;

    } catch (error) {
        throw error
    }
}

exports.consultarInformacoesAtualizadas = async (idExecucaoKit, idLocal) => {
    try {

        const consulta = await mysql.consultar(queryAgendaER.sqlConsultarDisponibidadeExecucaoKit, config.PaginaERDB, { IdExecucaoKit: idExecucaoKit, Idlocal: idLocal });        
        return consulta;

    } catch (error) {
        throw error
    }
}

exports.inserirMaisInformacoes = async (idExecucaoKit, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento) => {
    let retorno = false;
    try {
        const result = await mysql.incluir(queryAgendaER.sqlInserirInfoAdicionaisExecucaoKit, config.PaginaERDB, {idExecucaoKit, idLocalAtendimento, informacoesAdicionais, descrComplementoTitulo});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.consultarQtdExecucaoKitPresencial = async (idLocal) => {
    try {

        const consulta = await mysql.consultar(queryAgendaER.sqlQtdExecucaoKitPresencialDisponivel, config.PaginaERDB, {Idlocal: idLocal });        
        return consulta;

    } catch (error) {
        throw error
    }
}

exports.consultarQtdExecucaoKitOnline = async (idLocal) => {
    try {

        let execucaoKits = await mysql.consultar(queryAgendaER.sqlQtdExecucaoKitOnlineDisponivel, config.PaginaERDB, { Idlocal: idLocal });        
        return execucaoKits;

    } catch (error) {
        throw error
    }
}

exports.listarPresencialPorLocal = async (idLocal) => {
    try {

        let execucaoKits = await mysql.consultar(queryAgendaER.sqlListarExecucaoKitPresencialPorLocal, config.PaginaERDB, { IdLocalAtendimento: idLocal });
        //Lista os cursos que são da Central de Atendimento
        return execucaoKits;

    } catch (error) {
        throw error
    }
}

exports.listarOnlinePorLocal = async (idLocal) => {
    try {

        let execucaoKits = await mysql.consultar(queryAgendaER.sqlListarExecucaoKitOnlinePorLocal, config.PaginaERDB, { IdLocalAtendimento: idLocal });
        //Lista os cursos que são da Central de Atendimento
        return execucaoKits;
    } catch (error) {
        throw error
    }
}

exports.consultarQtdExecucaoKitPresencialSebraeAqui = async (idLocalSebraeAqui) => {
    try {

        const consulta = await mysql.consultar(queryAgendaER.sqlQtdExecucaoKitPresencialDisponivelSebraeAqui, config.PaginaERDB, {IdLocalAtendimentoDivisao: idLocalSebraeAqui });        
        return consulta;

    } catch (error) {
        throw error
    }
}

exports.consultarQtdExecucaoKitOnlineSebraeAqui = async (idLocalSebraeAqui) => {
    try {

        const consulta = await mysql.consultar(queryAgendaER.sqlQtdExecucaoKitOnlineDisponivelSebraeAqui, config.PaginaERDB, {IdLocalAtendimentoDivisao: idLocalSebraeAqui });        
        return consulta;

    } catch (error) {
        throw error
    }
}

exports.listarDisponiveisIdKit = async (idKit) => {
    try {

        const result = await mysql.consultar(queryAgendaER.sqlListarDisponibidadeExecucaoKitPorIdKit, config.PaginaERDB, { IdKit: idKit });
        return result;

    } catch (error) {
        throw error
    }
}

exports.listarPorIdKit = async (idKit) => {
    try {

        let execucaoKits = await mysql.consultar(queryAgendaER.sqlListarExecucaoKitPorKit, config.PaginaERDB, { IdKit: idKit });

        return execucaoKits;

    } catch (error) {
        throw error
    }
}

exports.consultarKit = async (idKit) => {
    try {
        let execucaoKits = await mysql.consultar(query.sqlConsultarKit, config.PaginaERDB, { IdKit: idKit });
        
        return execucaoKits;
    } catch (error) {
        throw error
    }
}


exports.listarKitsPersonalizados = async () => {
    try {
        let execucaoKits = await mysql.consultar(queryAgendaER.listarKitsPersonalizados, config.PaginaERDB);
        
        return execucaoKits;
    } catch (error) {
        throw error
    }
}

exports.consultarKitPersonalizado = async (idKit) => {
    try {
        let execucaoKits = await mysql.consultar(queryAgendaER.consultaKitPersonalizado, config.PaginaERDB, { IdKit: idKit });
        
        return execucaoKits[0];
    } catch (error) {
        throw error
    }
}

exports.inserirKitPersonalizado = async (idKit, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo) => {
    let retorno = false;
    try {
        const result = await mysql.incluir(queryAgendaER.inserirKitPersonalizado, config.PaginaERDB, {idKit, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.alterarKitPersonalizado = async (idKit, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.alterarKitPersonalizado, config.PaginaERDB, {ImagemGrande: imagemGrande, ImagemMedia: imagemMedia, ImagemPequena: imagemPequena, Video: video, SituacaoVideo: situacaoVideo, IdKit: idKit});
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.excluirKitPersonalizado = async (idKit) => {
    try {
        await mysql.incluir(queryAgendaER.excluirKitPersonalizado, config.PaginaERDB, {IdKit: idKit});
        return true;
    } catch (error) {
        throw error
    }
}

exports.cadastrarFaqKit = async (registro) => {
    let retorno = false;
    try {
        const result = await mysql.incluir(queryAgendaER.cadastrarFaqKit, config.PaginaERDB, registro);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}

exports.alterarFaqKit = async (registro) => {
    let retorno = false;
    try {
        const result = await mysql.alterar(queryAgendaER.atualizarFaqKit, config.PaginaERDB, registro);
        if (result.affectedRows && result.affectedRows >= 1) retorno = true;
    } catch (error) {
        throw error
    }
    return retorno;
}


exports.consultarFaqKitPorIdFaq = async (idFaqKit) => {
    try {
        let faq = await mysql.consultar(queryAgendaER.consultarFaqKitPorIdFaq, config.PaginaERDB, { IdFaqKit: idFaqKit });
        
        return faq[0];
    } catch (error) {
        throw error
    }
}

exports.consultarFaqPorIdKit = async (idKit) => {
    try {
        let faq = await mysql.consultar(queryAgendaER.consultarFaqPorIdKit, config.PaginaERDB, { IdKit: idKit });
        
        return faq;
    } catch (error) {
        throw error
    }
}

exports.excluirFaqKitPorIdFaq = async (idFaqKit) => {
    try {
        await mysql.incluir(queryAgendaER.excluirFaqKitPorIdFaq, config.PaginaERDB, {IdFaqKit: idFaqKit});
        return true;
    } catch (error) {
        throw error
    }
}

exports.excluirFaqKitPorIdKit = async (idKit) => {
    try {
        await mysql.incluir(queryAgendaER.excluirFaqKitPorIdKit, config.PaginaERDB, {IdKit: idKit});
        return true;
    } catch (error) {
        throw error
    }
}
