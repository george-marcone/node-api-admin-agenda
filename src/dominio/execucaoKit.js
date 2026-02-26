'use strict'
const execucaoKit = require("../repositories/execucaoKit");
const config = require('../config');
const { exec } = require("child_process");

exports.listar = async (idLocal) => {
    try {

        let retorno = [];

        let result = idLocal ? await execucaoKit.listarPorLocal(idLocal) : await execucaoKit.listar();
        
        let atendimentos = result.map(a => a.IdExecucaoKit);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let execucaoKits = result.filter(el => el.IdExecucaoKit == atendimento);
            let data = [];
            execucaoKits.forEach(execucaoKit => {
                data.push({ dataInicio: execucaoKit.DataInicio, dataFim: execucaoKit.DataFim });
            });
            let execucaoKit = execucaoKits[0];            
            let objeto = {
                idAtendimento: atendimento 
                , idProduto: execucaoKit.IdKit
                , idLocalAtendimento: execucaoKit.IdLocalAtendimento
                , idLocalAtendimentoDivisao: execucaoKit.IdLocalAtendimentoDivisao
                , titulo: execucaoKit.NomeKit.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: execucaoKit.DescrKit.replace("“", "").replace("”", "")
                , modalidade: execucaoKit.Modalidade.replace("Remota", "Online")
                , unidade: execucaoKit.Regional
                , tipo: "curso"
                , preco: execucaoKit.Preco
                , cargaHoraria: execucaoKit.NrCargaHoraria
                , idAreaConhecimento: execucaoKit.IdAreaConhecimento
                , areaConhecimento: execucaoKit.AreaConhecimento
                , agenda: data
                , exclusivoPJ: false
                , maisInformacoes: execucaoKit.InformacoesAdicionais
                , complementoTitulo: execucaoKit.DescrComplementoTitulo
                , idAtendimentoKit: execucaoKit.IdAtendimento //Código da primeira turma de um Kit
                , ordenacao: execucaoKit.Ordenacao
                , exclusivoPJ: execucaoKit.ExclusivoPJ
                , disponivel: execucaoKit.Disponivel == 1
                , destaque: execucaoKit.Destaque
                , certificado: execucaoKit.Certificado == 0? false : true
                , imagemGrande: execucaoKit.ImagemGrande
                , imagemMedia: execucaoKit.ImagemMedia
                , imagemPequena: execucaoKit.ImagemPequena
                , faq: []
                , video: execucaoKit.Video
                , situacaoVideo: execucaoKit.SituacaoVideo
            }
            if (execucaoKit.Modalidade == 'Presencial') {
                let endereco = {
                    cep: execucaoKit.CEP
                    , logradouro: execucaoKit.Logradouro
                    , numero: execucaoKit.Numero
                    , complemento: execucaoKit.Complemento
                    , bairro: execucaoKit.Bairro
                    , cidade: execucaoKit.Cidade
                    , uf: execucaoKit.UF
                }
                objeto.endereco = endereco;
            }

            objeto.inscricao = `https://inscricao.sebraesp.com.br/kit/turma/${execucaoKit.IdExecucaoKit}`
            retorno.push(objeto);
        });
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.consultar = async (idExecucaoKit) => {
    try {
        let retorno = await execucaoKit.consultar(idExecucaoKit);
        return retorno;
    } catch (error) {
        throw error;
    }
}

// Inclui/Remove a disponibilização de um curso para um Local Específico
exports.disponibilizar = async (idLocal, idExecucaoKit, exclusivoPJ, divulgarMarketing = false) => {
    try {
        await execucaoKit.disponibilizar(idLocal, idExecucaoKit, exclusivoPJ, divulgarMarketing);
    } catch (error) {
        throw error
    }
}

exports.destacarCursos = async (idLocal, idExecucaoKit, destaque) => {
    try {
        await execucaoKit.disponibilizar(idLocal, idExecucaoKit, destaque, );
    } catch (error) {
        throw error
    }
}

// Inclui/Remove a disponibilização de cursos em lote para um Local Específico
exports.disponibilizarEmLote = async (idLocal, idExecucaoKits) => {
    try {
        for (let idExecucaoKit of idExecucaoKits)
            await execucaoKit.disponibilizar(idLocal, idExecucaoKit);
    } catch (error) {
        throw error
    }
}

exports.listarDisponiveis = async (idLocal) => {
    try {
        let retorno = [];
        let result = await execucaoKit.listarDisponiveis(idLocal);
        let atendimentos = result.map(a => a.IdExecucaoKit);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let execucaoKits = result.filter(el => el.IdExecucaoKit == atendimento);
            let data = [];
            execucaoKits.forEach(execucaoKit => {
                data.push({ dataInicio: execucaoKit.DataInicio, dataFim: execucaoKit.DataFim });
            });
            let execucaoKit = execucaoKits[0];
            let objeto = {
                idAtendimento: atendimento
                , idProduto: execucaoKit.IdKit
                , idLocalAtendimento: execucaoKit.IdLocalAtendimento
                , idLocalAtendimentoDivisao: execucaoKit.IdLocalAtendimentoDivisao
                , titulo: execucaoKit.NomeKit.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: execucaoKit.DescrKit.replace("“", "").replace("”", "")
                , modalidade: execucaoKit.Modalidade.replace("Remota", "Online")
                , unidade: execucaoKit.Regional
                , tipo: "curso"
                , preco: execucaoKit.Preco
                , cargaHoraria: execucaoKit.NrCargaHoraria
                , idAreaConhecimento: execucaoKit.IdAreaConhecimento
                , areaConhecimento: execucaoKit.AreaConhecimento
                , agenda: data
                , maisInformacoes: execucaoKit.InformacoesAdicionais
                , complementoTitulo: execucaoKit.DescrComplementoTitulo
                , idAtendimentoKit: execucaoKit.IdAtendimento //Código da primeira turma de um Kit
                , ordenacao: execucaoKit.Ordenacao
                , exclusivoPJ: execucaoKit.ExclusivoPJ
                , disponivel: execucaoKit.Disponivel == 1
                , destaque: execucaoKit.Destaque
                , divulgarMarketing: execucaoKit.DivulgarMarketing
                , certificado: execucaoKit.Certificado == 0? false : true
                , imagemGrande: execucaoKit.ImagemGrande
                , imagemMedia: execucaoKit.ImagemMedia
                , imagemPequena: execucaoKit.ImagemPequena
                , video: execucaoKit.Video
                , situacaoVideo: execucaoKit.SituacaoVideo
            }
            if (execucaoKit.Modalidade == 'Presencial') {
                let endereco = {
                    cep: execucaoKit.CEP
                    , logradouro: execucaoKit.Logradouro
                    , numero: execucaoKit.Numero
                    , complemento: execucaoKit.Complemento
                    , bairro: execucaoKit.Bairro
                    , cidade: execucaoKit.Cidade
                    , uf: execucaoKit.UF
                }
                objeto.endereco = endereco;
            }

            objeto.inscricao = `https://inscricao.sebraesp.com.br/kit/turma/${execucaoKit.IdExecucaoKit}`
            retorno.push(objeto);
        });
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.atualizarPJ = async (idLocal, idExecucaoKit, exclusivoPJ) => {
    try {
        const result = await execucaoKit.atualizarPJ(idLocal, idExecucaoKit, exclusivoPJ);
        return result;
    } catch (error) {
        throw error
    }
}

exports.destacarCurso = async (cursoDestaque) => {
    try {
        const result = await execucaoKit.destacarCurso(cursoDestaque);
        return result
    } catch (error) {
        throw error
    }
}

exports.priorizarCurso = async (cursoOrdenar) => {
    try {
        const result = await execucaoKit.priorizarCurso(cursoOrdenar);
        return result
    } catch (error) {
        throw error
    }
}

exports.consultarMaisInformacoes = async (idExecucaoKit, idLocalAtendimento) => {
    try {
        const result = await execucaoKit.consultarMaisInformacoes(idExecucaoKit, idLocalAtendimento);
        return result
    } catch (error) {
        throw error
    }
}

exports.inserirMaisInformacoes = async (idExecucaoKit, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento) => {
    try {
        const result = await execucaoKit.inserirMaisInformacoes(idExecucaoKit, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento);
        return result
    } catch (error) {
        throw error
    }
}

exports.editarMaisInformacoes = async (idExecucaoKit, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento) => {
    try {
        const result = await execucaoKit.editarMaisInformacoes(idExecucaoKit, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento);
        return result
    } catch (error) {
        throw error
    }
}

exports.marketing = async (idExecucaoKit, idLocalAtendimento, divulgarMarketing) => {
    try {
        const result = await execucaoKit.marketing(idExecucaoKit, idLocalAtendimento, divulgarMarketing);
        return result
    } catch (error) {
        throw error
    }
}

exports.consultarInformacoesAtualizadas = async (idExecucaoKit, idLocal) => { 
    try {
        let retorno = await execucaoKit.consultarInformacoesAtualizadas(idExecucaoKit, idLocal);
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.consultarQtdExecucaoKitPresencial = async (idLocal) => {
    try {
        let retorno = await execucaoKit.consultarQtdExecucaoKitPresencial(idLocal);
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.consultarQtdExecucaoKitOnline = async (idLocal) => {
    try {
        let retorno = await execucaoKit.consultarQtdExecucaoKitOnline(idLocal);
        return retorno;
    } catch (error) {
        throw error
    }
}


exports.listarPorModalidade = async (idLocal, modalidade) => {
    try {

        let retorno = [];

        let result
        if (modalidade == 'Presencial')
            result = await execucaoKit.listarPresencialPorLocal(idLocal)
        else
            result = await execucaoKit.listarOnlinePorLocal(idLocal);
        
        let atendimentos = result.map(a => a.IdExecucaoKit);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let execucaoKits = result.filter(el => el.IdExecucaoKit == atendimento);
            let data = [];
            execucaoKits.forEach(execucaoKit => {
                data.push({ dataInicio: execucaoKit.DataInicio, dataFim: execucaoKit.DataFim });
            });
            let execucaoKit = execucaoKits[0];
            let objeto = {
                idAtendimento: atendimento
                , idProduto: execucaoKit.IdKit
                , idLocalAtendimento: execucaoKit.IdLocalAtendimento
                , idLocalAtendimentoDivisao: execucaoKit.IdLocalAtendimentoDivisao
                , titulo: execucaoKit.NomeKit.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: execucaoKit.DescrKit.replace("“", "").replace("”", "")
                , modalidade: execucaoKit.Modalidade.replace("Remota", "Online")
                , unidade: execucaoKit.Regional
                , tipo: "curso"
                , preco: execucaoKit.Preco
                , cargaHoraria: execucaoKit.NrCargaHoraria
                , idAreaConhecimento: execucaoKit.IdAreaConhecimento
                , areaConhecimento: execucaoKit.AreaConhecimento
                , agenda: data
                , exclusivoPJ: false
                , maisInformacoes: execucaoKit.InformacoesAdicionais
                , complementoTitulo: execucaoKit.DescrComplementoTitulo
                , idAtendimentoKit: execucaoKit.IdAtendimento //Código da primeira turma de um Kit
                , ordenacao: execucaoKit.Ordenacao
                , exclusivoPJ: execucaoKit.ExclusivoPJ
                , disponivel: execucaoKit.Disponivel == 1
                , destaque: execucaoKit.Destaque
                , certificado: execucaoKit.Certificado == 0 ? false : true
                , imagemGrande: execucaoKit.ImagemGrande
                , imagemMedia: execucaoKit.ImagemMedia
                , imagemPequena: execucaoKit.ImagemPequena
            }

            if (execucaoKit.Modalidade == 'Presencial') {
                let endereco = {
                    cep: execucaoKit.CEP
                    , logradouro: execucaoKit.Logradouro
                    , numero: execucaoKit.Numero
                    , complemento: execucaoKit.Complemento
                    , bairro: execucaoKit.Bairro
                    , cidade: execucaoKit.Cidade
                    , uf: execucaoKit.UF
                }
                objeto.endereco = endereco;                         
             }

            objeto.inscricao = `https://inscricao.sebraesp.com.br/kit/turma/${execucaoKit.IdExecucaoKit}`
            retorno.push(objeto);
        });
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.consultarQtdExecucaoKitPresencialSebraeAqui = async (idLocalSebraeAqui) => { 
    try {
        let retorno = await execucaoKit.consultarQtdExecucaoKitPresencialSebraeAqui(idLocalSebraeAqui);
        return retorno;
    } catch (error) {
        throw error;
    }
}


exports.consultarQtdExecucaoKitOnlineSebraeAqui = async (idLocalSebraeAqui) => {
    try {
        let retorno = await execucaoKit.consultarQtdExecucaoKitOnlineSebraeAqui(idLocalSebraeAqui);
        return retorno;
    } catch (error) {
        throw error;
    }
}
 
exports.listarDisponiveisIdKit = async (idKit) => {
    try {
        let retorno = [];
        let result = await execucaoKit.listarDisponiveisIdKit(idKit);
        let atendimentos = result.map(a => a.IdExecucaoKit);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let execucaoKits = result.filter(el => el.IdExecucaoKit == atendimento);
            let data = [];
            execucaoKits.forEach(execucaoKit => {
                data.push({ dataInicio: execucaoKit.DataInicio, dataFim: execucaoKit.DataFim });
            });
            let execucaoKit = execucaoKits[0];
            let objeto = {
                idAtendimento: atendimento
                , idProduto: execucaoKit.IdKit
                , idLocalAtendimento: execucaoKit.IdLocalAtendimento
                , idLocalAtendimentoDivisao: execucaoKit.IdLocalAtendimentoDivisao
                , titulo: execucaoKit.NomeKit.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: execucaoKit.DescrKit.replace("“", "").replace("”", "")
                , modalidade: execucaoKit.Modalidade.replace("Remota", "Online")
                , unidade: execucaoKit.Regional
                , tipo: "curso"
                , preco: execucaoKit.Preco
                , cargaHoraria: execucaoKit.NrCargaHoraria
                , idAreaConhecimento: execucaoKit.IdAreaConhecimento
                , areaConhecimento: execucaoKit.AreaConhecimento
                , agenda: data
                , maisInformacoes: execucaoKit.InformacoesAdicionais
                , complementoTitulo: execucaoKit.DescrComplementoTitulo
                , idAtendimentoKit: execucaoKit.IdAtendimento //Código da primeira turma de um Kit
                , ordenacao: execucaoKit.Ordenacao
                , exclusivoPJ: execucaoKit.ExclusivoPJ
                , disponivel: execucaoKit.Disponivel == 1
                , destaque: execucaoKit.Destaque
                , divulgarMarketing: execucaoKit.DivulgarMarketing
                , certificado: execucaoKit.Certificado == 0? false : true
                , imagemGrande: execucaoKit.ImagemGrande
                , imagemMedia: execucaoKit.ImagemMedia
                , imagemPequena: execucaoKit.ImagemPequena
                , video: execucaoKit.Video
                , situacaoVideo: execucaoKit.SituacaoVideo
            }
            // if (execucaoKit.Modalidade == 'Presencial') {
                let endereco = {
                    cep: execucaoKit.CEP
                    , logradouro: execucaoKit.Logradouro
                    , numero: execucaoKit.Numero
                    , complemento: execucaoKit.Complemento
                    , bairro: execucaoKit.Bairro
                    , cidade: execucaoKit.Cidade
                    , uf: execucaoKit.UF
                }
                objeto.endereco = endereco;
            // }

            objeto.inscricao = `https://inscricao.sebraesp.com.br/kit/turma/${execucaoKit.IdExecucaoKit}`
            retorno.push(objeto);
        });
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.listarPorIdKit = async (idKit) => {
    try {

        let retorno = [];

        let result = idKit ? await execucaoKit.listarPorIdKit(idKit) : await execucaoKit.listar();
        let resultFaq = await execucaoKit.consultarFaqPorIdKit(idKit)
        let atendimentos = result.map(a => a.IdExecucaoKit);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let execucaoKits = result.filter(el => el.IdExecucaoKit == atendimento);
            let data = [];
            execucaoKits.forEach(execucaoKit => {
                data.push({ dataInicio: execucaoKit.DataInicio, dataFim: execucaoKit.DataFim });
            });
            let execucaoKit = execucaoKits[0];
            let objeto = {
                idAtendimento: atendimento 
                , idProduto: execucaoKit.IdKit
                , idLocalAtendimento: execucaoKit.IdLocalAtendimento
                , idLocalAtendimentoDivisao: execucaoKit.IdLocalAtendimentoDivisao
                , titulo: execucaoKit.NomeKit.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: execucaoKit.DescrKit.replace("“", "").replace("”", "")
                , modalidade: execucaoKit.Modalidade.replace("Remota", "Online")
                , unidade: execucaoKit.Regional
                , tipo: "curso"
                , preco: execucaoKit.Preco
                , cargaHoraria: execucaoKit.NrCargaHoraria
                , idAreaConhecimento: execucaoKit.IdAreaConhecimento
                , areaConhecimento: execucaoKit.AreaConhecimento
                , agenda: data
                , exclusivoPJ: false
                , maisInformacoes: execucaoKit.InformacoesAdicionais
                , complementoTitulo: execucaoKit.DescrComplementoTitulo
                , idAtendimentoKit: execucaoKit.IdAtendimento //Código da primeira turma de um Kit
                , ordenacao: execucaoKit.Ordenacao
                , exclusivoPJ: execucaoKit.ExclusivoPJ
                , disponivel: execucaoKit.Disponivel == 1
                , destaque: execucaoKit.Destaque
                , certificado: execucaoKit.Certificado == 0? false : true
                , imagemGrande: execucaoKit.ImagemGrande
                , imagemMedia: execucaoKit.ImagemMedia
                , imagemPequena: execucaoKit.ImagemPequena
                , faq: resultFaq || []
                , video: execucaoKit.Video
                , situacaoVideo: execucaoKit.SituacaoVideo
            }
            // if (execucaoKit.Modalidade == 'Presencial') {
                let endereco = {
                    cep: execucaoKit.CEP
                    , logradouro: execucaoKit.Logradouro
                    , numero: execucaoKit.Numero
                    , complemento: execucaoKit.Complemento
                    , bairro: execucaoKit.Bairro
                    , cidade: execucaoKit.Cidade
                    , uf: execucaoKit.UF
                }
                objeto.endereco = endereco;
            // }

            objeto.inscricao = `https://inscricao.sebraesp.com.br/kit/turma/${execucaoKit.IdExecucaoKit}`
            retorno.push(objeto);
        });
        return retorno;
    } catch (error) {
        throw error
    }
}


exports.consultarKit = async (idKit) => {
    try {
        let retorno = await execucaoKit.consultarKit(idKit);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.listarKitsPersonalizados = async () => {
    try {
        let retorno = await execucaoKit.listarKitsPersonalizados();
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.consultaKitPersonalizado = async (idKit) => {
    try {
        let retorno = await execucaoKit.consultarKitPersonalizado(idKit);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.inserirKitPersonalizado = async (idKit, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo) => {
    try {
        let retorno = await execucaoKit.inserirKitPersonalizado(idKit, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.alterarKitPersonalizado = async (idKit, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo) => {
    try {
        let retorno = await execucaoKit.alterarKitPersonalizado(idKit, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.excluirKitPersonalizado = async (idKit) => {
    try {
        let retorno = await execucaoKit.excluirKitPersonalizado(idKit);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.cadastrarFaqKit = async (payload) => {
    try {
            // let dados = [];
            let retorno;
    
            for (let i = 0; i < payload.faq.length; i++){
    
                let existeDado = payload.faq[i].id != undefined && payload.faq[i].id != null? await execucaoKit.consultarFaqKitPorIdFaq(payload.faq[i].id) : null
                let registro = {}
                
                if (!existeDado) {
                    registro = {
                        IdKit: payload.idKit, 
                        NrOrdenacao: i + 1,
                        DsPergunta: payload.faq[i].pergunta,
                        DsResposta: payload.faq[i].resposta,                
                    }    
                    // dados.push(registro)           
                    if (payload.faq[i].pergunta != "" && payload.faq[i].resposta != "")
                        retorno = await execucaoKit.cadastrarFaqKit(registro);
                }
                else {
                    if (payload.faq[i].pergunta == "" || payload.faq[i].resposta == "") {
                        retorno = await excluirFaqKit(payload.faq[i].id)
                    }
                    else {
                        registro = {
                            NrOrdenacao: i + 1,
                            DsPergunta: payload.faq[i].pergunta,
                            DsResposta: payload.faq[i].resposta,                
                            IdFaqKit: payload.faq[i].id,
                            IdKit: payload.idKit
                        }  
                        retorno = await alterarFaqKit(registro)
                    }
                }
            }        
                        
        return retorno;
    }
    catch (error) {
        throw error;
    }
}

let alterarFaqKit = async (registro) => {
    try {
        let retorno = await execucaoKit.alterarFaqKit(registro);
        return retorno;
    } catch (error) {
        throw error;
    }
}

let excluirFaqKit = async (idFaqKit) => {
    try {
        let retorno = await execucaoKit.excluirFaqKitPorIdFaq(idFaqKit);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.excluirFaqKitPorIdKit = async (idKit) => {
    try {
        let retorno = await execucaoKit.excluirFaqKitPorIdKit(idKit)
        return retorno;
    }
    catch (error) {
        throw error
    }
}

exports.consultarFaqPorIdKit = async (idKit) => {
    try {
        let retorno = await execucaoKit.consultarFaqPorIdKit(idKit)
        return retorno;
    } catch (error) {
        throw error
    }
}
