'use strict'
const consultoria = require("../repositories/consultoria");
const email = require('../services/email');
const local = require("../repositories/local");


exports.listar = async (idLocal = null) => {
    try {
        let result =  await consultoria.listar(idLocal);
        result = await result.map(elem => {
            return {
                idProduto: elem.IdProduto,
                titulo: elem.DescrTituloProduto,
                descricao: elem.DescrProduto,
                preco: elem.Preco,
                cargaHoraria: elem.NrCargaHoraria,
                modalidade: elem.Modalidade == "Remoto" ? "Online" : elem.Modalidade,
                idInstrumento: elem.IdInstrumento,
                idAreaConhecimento: elem.IdAreaConhecimento,
                areaConhecimento: elem.AreaConhecimento,
                maisInformacoes: elem.InformacoesAdicionais,
                idConteudoApoio: elem.IdConteudoApoio,
                tituloConteudoApoio: elem.Titulo,
                linkDownload: elem.URL,
                destaque: false,
                disponivel: true
            }
        });
        return result;
    } catch (error) {
        throw error
    }
}

exports.consultar = async (idLConsultoria) => {
    try {
        let result =  await consultoria.consultar(idLConsultoria);
        return result;
    } catch (error) {
        throw error
    }
}

exports.disponibilizar = async (idLocal, idConsultoria, exibirFormulario = false, divulgarMarketing = false) => {
    try {
        let result =  await consultoria.disponibilizar(idLocal, idConsultoria, exibirFormulario, divulgarMarketing);
        return result;
    } catch (error) {
        throw error
    }
}

exports.destaque = async (idLocal, idConsultoria, destaque) => {
    try {
        let result =  await consultoria.destaque(idLocal, idConsultoria, destaque);
        return result;
    } catch (error) {
        throw error
    }
}


exports.ordenacao = async (idLocal, idConsultoria, ordenacao) => {
    try {
        let result =  await consultoria.ordenacao(idLocal, idConsultoria, ordenacao);
        return result;
    } catch (error) {
        throw error
    }
}


exports.listarDisponiveis = async (idLocal) => {
    try {
        let result =  await consultoria.listarDisponiveis(idLocal);
        return result;
    } catch (error) {
        throw error
    }
}

exports.listarInteressados = async (idLocal) => {
    try {
        let result =  await consultoria.listarInteressados(idLocal);
        return result;
    } catch (error) {
        throw error
    }
}

exports.consultarInteressado = async (idInteracao) => {
    try {

        const result = await consultoria.consultarInteressado(idInteracao);
        return result;
    } catch (error) {
        throw error
    }
}		

exports.excluirInteressado = async (idInteracao, faraConsultoria) => {
    try {
        let result =  await consultoria.excluirInteressado(idInteracao, faraConsultoria);
		return result;
    } catch (error) {
        throw error
    }
}				

exports.cadastrarInteressado = async (interessado) => {
    try {
        let result =  await consultoria.cadastrarInteressado(interessado);
		return result;
    } catch (error) {
        throw error
    }
}

exports.consultarMaisInfoConsultoria = async (idConsultoria, idLocal) => {
    try {
        let result =  await consultoria.consultarMaisInfoConsultoria(idConsultoria, idLocal);
        return result;
    } catch (error) {
        throw error
    }
}

exports.inserirMaisInfoConsultoria = async (idConsultoria, idLocal, informacoesAdicionais) => {
    let result = false;
    try {
        result =  await consultoria.inserirMaisInfoConsultoria(idConsultoria, idLocal, informacoesAdicionais);
        return result;
    } catch (error) {
        throw error
    }
}

exports.editarMaisInfoConsultoria = async (idConsultoria, idLocal, informacoesAdicionais) => {
    let result = false;
    try {
        result =  await consultoria.editarMaisInfoConsultoria(idConsultoria, idLocal, informacoesAdicionais);
        return result;

    } catch (error) {
        throw error
    }

}

exports.enviarEmailInteressado = async (dados) => {
    try {

        const consulta = await local.consultar(dados.idLocal);
        let result = consulta[0];

        if(result != null && result['emailAlerta'] != null && result['emailAlerta'] != ''){
            
            let dadosConsultoria =  await consultoria.consultar(dados.idProduto);

            let subject = 'Agenda | Novo interessado por consultoria';
            let to = result['emailAlerta'];

            email.emailInteressado(
                {to, subject},
                dados,
                {
                    nome: dadosConsultoria.length > 0 ? dadosConsultoria[0]['DescrTituloProduto'] : ''
                },
                {
                    slug: result['slug']
                })
            .catch(console.error);
        }

    } catch (error) {
        throw error
    }
}

exports.enviarEmailTeste = async (idLocal) => {
    try {

        const consulta = await local.consultar(idLocal);
        let result = consulta[0];

        if(result != null && result['emailAlerta'] != null && result['emailAlerta'] != ''){

            let subject = 'Agenda | Email de configuração de consultoria do ER';
            let to = result['emailAlerta'];

            email.emailTeste({to, subject})
            .catch(console.error);
        }

    } catch (error) {
        throw error
    }
}

exports.editarConsultoriaDisponivel = async (idConsultoria, idLocal, exibirFormulario) => {
    let result = false;
    try {
        let consultoriaDisponivel = await consultoria.consultarDisponivel(idLocal, idConsultoria);  
        if (consultoriaDisponivel != null && consultoriaDisponivel.length) { 
            result =  await consultoria.editarConsultoriaDisponivel(idConsultoria, idLocal, exibirFormulario);
        }
        else
            return true            
        return result;

    } catch (error) {
        throw error
    }
}

exports.retornaConsultoriaEditada = async (idLocal, idConsultoria) => {    
    try {
        let consultoriaAtualizada  = await consultoria.retornaConsultoriaEditada(idLocal, idConsultoria);           
        return consultoriaAtualizada;
    } catch (error) {
        throw error
    }
}

exports.marketing = async (idLocal, idConsultoria, divulgarMarketing = false) => {
    try {
        let result =  await consultoria.marketing(idLocal, idConsultoria, divulgarMarketing);
        return result;
    } catch (error) {
        throw error
    }
}

exports.listarMarketingDivulgar = async () => {
    try {
        let result = await consultoria.listarMarketingDivulgar();
        return result;
    } catch (error) {
        throw error
    }
}

exports.qtdConcultoriaDisponivel = async (idLocal) => {
    try {
        let result =  await consultoria.qtdConcultoriaDisponivel(idLocal);
        return result;
    } catch (error) {
        throw error
    }
}