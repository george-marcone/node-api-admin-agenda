'use strict'
const coletivo = require("../repositories/coletivo");

exports.listar = async (idLocal) => {
    try {

        let retorno = [];

        let result = idLocal ? await coletivo.listarPorLocal(idLocal) : await coletivo.listar();
        
        let atendimentos = result.map(a => a.IdAtendimento);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let coletivos = result.filter(el => el.IdAtendimento == atendimento);
            let data = [];            
            coletivos.forEach(coletivo => {
                data.push({ dataInicio: coletivo.DataInicio, dataFim: coletivo.DataFim });
            });
            let coletivo = coletivos[0];            
            let objeto = {
                idAtendimento: atendimento
                , idLocalAtendimento: coletivo.IdLocalAtendimento
                , idLocalAtendimentoDivisao: coletivo.IdLocalAtendimentoDivisao
                , idProduto: coletivo.IdProduto
                , titulo: coletivo.DescrTituloProduto.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: coletivo.DescrProduto.replace("“", "").replace("”", "")
                , modalidade: coletivo.Modalidade.replace("Remota", "Online")
                , unidade: coletivo.Regional
                , tipo: obterTipo(coletivo.IdInstrumento)
                , preco: coletivo.Preco
                , cargaHoraria: coletivo.NrCargaHoraria
                , idAreaConhecimento: coletivo.IdAreaConhecimento
                , areaConhecimento: coletivo.AreaConhecimento
                , agenda: data
                , exclusivoPJ: false
                , disponivel: coletivo.Disponivel == 1
                , maisInformacoes: coletivo.InformacoesAdicionais
                , complementoTitulo: coletivo.DescrComplementoTitulo
                , idAtendimentoKit: null //Código da primeira turma de um Kit
                , certificado: coletivo.Certificado == 0? false : true
                , imagemGrande: coletivo.ImagemGrande
                , imagemMedia: coletivo.ImagemMedia
                , imagemPequena: coletivo.ImagemPequena
                , faq: []
                , video: coletivo.Video
                , situacaoVideo: coletivo.SituacaoVideo
            }
            if (coletivo.Modalidade == 'Presencial') {
                let endereco = {
                    cep: coletivo.CEP
                    , logradouro: coletivo.Logradouro
                    , numero: coletivo.Numero
                    , complemento: coletivo.Complemento
                    , bairro: coletivo.Bairro
                    , cidade: coletivo.Cidade
                    , uf: coletivo.UF
                }
                objeto.endereco = endereco;                         
            }
            objeto.inscricao = `https://inscricao.sebraesp.com.br/produto/turma/${atendimento}`
            retorno.push(objeto);
        });
        //Remoção de entrevista empretec porque o instrumento é Informação Presencial
        retorno = retorno.filter(el => el.id != 264);
        return retorno;
    } catch (error) {
        throw error
    }
}

let obterTipo = (idInstrumento) => {
    let instrumentos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let indice = instrumentos.indexOf(idInstrumento);
    if (indice < 0) return 'curso';
    let tipos = ["consultoria", "consultoria", "curso", "curso", "feira", "informação", "informação", "missão/caravana", "oficina", "orientação técnica", "orientação",  "palestra", "rodada de negócios", "seminário"];
    return tipos[indice];
}


// Inclui/Remove a disponibilização de um curso para um Local Específico
exports.disponibilizar = async (idLocal, idAtendimento, exclusivoPJ, divulgarMarketing = false) => {
    try {
        await coletivo.disponibilizar(idLocal, idAtendimento, exclusivoPJ, divulgarMarketing);
    } catch (error) {
        throw error
    }
}

// Inclui/Remove a disponibilização de um cursos em Lote para um local específico
exports.disponibilizarEmLote = async (idLocal, idAtendimentos) => {
    try {
        for (let idAtendimento of idAtendimentos)
            await coletivo.disponibilizar(idLocal, idAtendimento);
    } catch (error) {
        throw error
    }
}

exports.listarDisponiveis = async (idLocal) => {
    try {
        let retorno = [];
        let result = await coletivo.listarDisponiveis(idLocal);
        let atendimentos = result.map(a => a.IdAtendimento);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let coletivos = result.filter(el => el.IdAtendimento == atendimento);
            let data = [];            
            coletivos.forEach(coletivo => {
                data.push({ dataInicio: coletivo.DataInicio, dataFim: coletivo.DataFim });
            });
            let coletivo = coletivos[0];
            let objeto = {
                idAtendimento: atendimento
                , idLocalAtendimento: coletivo.IdLocalAtendimento
                , idLocalAtendimentoDivisao: coletivo.IdLocalAtendimentoDivisao
                , idProduto: coletivo.IdProduto
                , titulo: coletivo.DescrTituloProduto.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: coletivo.DescrProduto.replace("“", "").replace("”", "")
                , modalidade: coletivo.Modalidade.replace("Remota", "Online")
                , unidade: coletivo.Regional
                , tipo: obterTipo(coletivo.IdInstrumento)
                , preco: coletivo.Preco
                , cargaHoraria: coletivo.NrCargaHoraria
                , idAreaConhecimento: coletivo.IdAreaConhecimento
                , areaConhecimento: coletivo.AreaConhecimento
                , agenda: data
                , exclusivoPJ: false
                , maisInformacoes: coletivo.InformacoesAdicionais
                , complementoTitulo: coletivo.DescrComplementoTitulo
                , idAtendimentoKit: null //Código da primeira turma de um Kit
                , ordenacao: coletivo.Ordenacao
                , exclusivoPJ: coletivo.ExclusivoPJ
                , disponivel: coletivo.Disponivel == 1
                , destaque: coletivo.Destaque
                , ordenacao: coletivo.Ordenacao
                , divulgarMarketing: coletivo.DivulgarMarketing
                , certificado: coletivo.Certificado == 0? false : true
                , imagemGrande: coletivo.ImagemGrande
                , imagemMedia: coletivo.ImagemMedia
                , imagemPequena: coletivo.ImagemPequena
                , video: coletivo.Video
                , situacaoVideo: coletivo.SituacaoVideo
            }
            if (coletivo.Modalidade == 'Presencial') {
                let endereco = {
                    cep: coletivo.CEP
                    , logradouro: coletivo.Logradouro
                    , numero: coletivo.Numero
                    , complemento: coletivo.Complemento
                    , bairro: coletivo.Bairro
                    , cidade: coletivo.Cidade
                    , uf: coletivo.UF
                }
                objeto.endereco = endereco;                         
            }
            objeto.inscricao = `https://inscricao.sebraesp.com.br/produto/turma/${atendimento}`
            retorno.push(objeto);
        });
        //Remoção de entrevista empretec porque o instrumento é Informação Presencial
        retorno = retorno.filter(el => el.id != 264);
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.atualizarPJ = async (idLocal, idAtendimento, exclusivoPJ) => {
    try {
        const result = await coletivo.atualizarPJ(idLocal, idAtendimento, exclusivoPJ);
        return result
    } catch (error) {
        throw error
    }
}

exports.destacarCurso = async (cursoDestaque) => {
    try {
        const result = await coletivo.destacarCurso(cursoDestaque);
        return result
    } catch (error) {
        throw error
    }
}

exports.priorizarCurso = async (cursoOrdenar) => {
    try {
        const result = await coletivo.priorizarCurso(cursoOrdenar);
        return result
    } catch (error) {
        throw error
    }
}

exports.consultarMaisInformacoes = async (idAtendimento, idLocalAtendimento) => {
    try {
        const result = await coletivo.consultarMaisInformacoes(idAtendimento, idLocalAtendimento);
        return result
    } catch (error) {
        throw error
    }
}

exports.inserirMaisInformacoes = async (idAtendimento, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento) => {
    try {
        const result = await coletivo.inserirMaisInformacoes(idAtendimento, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento);
        return result
    } catch (error) {
        throw error
    }
}

exports.editarMaisInformacoes = async (idAtendimento, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento) => {
    try {
        const result = await coletivo.editarMaisInformacoes(idAtendimento, informacoesAdicionais, descrComplementoTitulo, idLocalAtendimento);
        return result
    } catch (error) {
        throw error
    }
}

exports.marketing = async (idAtendimento, idLocalAtendimento, divulgarMarketing) => {
    try {
        const result = await coletivo.marketing(idAtendimento, idLocalAtendimento, divulgarMarketing);
        return result
    } catch (error) {
        throw error
    }
}

exports.consultarInformacoesAtualizadas = async (idAtendimento, idLocal) => { 
    try {
        let retorno = await coletivo.consultarInformacoesAtualizadas(idAtendimento, idLocal);
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.consultar = async (idAtendimento) => {
    try {
        let retorno = await coletivo.consultar(idAtendimento);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.consultarQtdColetivoPresencial = async (idLocal) => {
    try {
        let retorno = await coletivo.consultarQtdColetivoPresencial(idLocal);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.consultarQtdColetivoOnline = async (idLocal) => {
    try {
        let retorno = await coletivo.consultarQtdColetivoOnline(idLocal);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.listarPorModalidade = async (idLocal, modalidade) => {
    try {

        let retorno = [];

        let result
        if (modalidade == 'Presencial')
            result = await coletivo.listarPresencialPorLocal(idLocal)
        else
            result = await coletivo.listarOnlinePorLocal(idLocal);
        
        let atendimentos = result.map(a => a.IdAtendimento);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let coletivos = result.filter(el => el.IdAtendimento == atendimento);
            let data = [];            
            coletivos.forEach(coletivo => {
                data.push({ dataInicio: coletivo.DataInicio, dataFim: coletivo.DataFim });
            });
            let coletivo = coletivos[0];
            // console.log(coletivo)
            let objeto = {
                idAtendimento: atendimento
                , idLocalAtendimento: coletivo.IdLocalAtendimento
                , idLocalAtendimentoDivisao: coletivo.IdLocalAtendimentoDivisao
                , idProduto: coletivo.IdProduto
                , titulo: coletivo.DescrTituloProduto.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: coletivo.DescrProduto.replace("“", "").replace("”", "")
                , modalidade: coletivo.Modalidade.replace("Remota", "Online")
                , unidade: coletivo.Regional
                , tipo: obterTipo(coletivo.IdInstrumento)
                , preco: coletivo.Preco
                , cargaHoraria: coletivo.NrCargaHoraria
                , idAreaConhecimento: coletivo.IdAreaConhecimento
                , areaConhecimento: coletivo.AreaConhecimento
                , agenda: data
                , exclusivoPJ: false
                , disponivel: coletivo.Disponivel == 1
                , maisInformacoes: coletivo.InformacoesAdicionais
                , complementoTitulo: coletivo.DescrComplementoTitulo
                , idAtendimentoKit: null //Código da primeira turma de um Kit
                , certificado: coletivo.Certificado == 0? false : true
                , imagemGrande: coletivo.ImagemGrande
                , imagemMedia: coletivo.ImagemMedia
                , imagemPequena: coletivo.ImagemPequena
            }
             if (coletivo.Modalidade == 'Presencial') {
                let endereco = {
                    cep: coletivo.CEP
                    , logradouro: coletivo.Logradouro
                    , numero: coletivo.Numero
                    , complemento: coletivo.Complemento
                    , bairro: coletivo.Bairro
                    , cidade: coletivo.Cidade
                    , uf: coletivo.UF
                }
                objeto.endereco = endereco;                         
             }
            objeto.inscricao = `https://inscricao.sebraesp.com.br/produto/turma/${atendimento}`
            retorno.push(objeto);
        });
        //Remoção de entrevista empretec porque o instrumento é Informação Presencial
        retorno = retorno.filter(el => el.id != 264);
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.consultarQtdColetivoPresencialSebraeAqui = async (idLocalSebraeAqui) => { 
    try {
        let retorno = await coletivo.consultarQtdColetivoPresencialSebraeAqui(idLocalSebraeAqui);
        return retorno;
    } catch (error) {
        throw error;
    }
}


exports.consultarQtdColetivoOnlineSebraeAqui = async (idLocalSebraeAqui) => {
    try {
        let retorno = await coletivo.consultarQtdColetivoOnlineSebraeAqui(idLocalSebraeAqui);
        return retorno;
    } catch (error) {
        throw error;
    }
}
 
exports.listarDisponiveisIdProduto = async (idProduto) => {
    try {
        let retorno = [];
        let result = await coletivo.listarDisponiveisIdProduto(idProduto);
        let atendimentos = result.map(a => a.IdAtendimento);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let coletivos = result.filter(el => el.IdAtendimento == atendimento);
            let data = [];            
            coletivos.forEach(coletivo => {
                data.push({ dataInicio: coletivo.DataInicio, dataFim: coletivo.DataFim });
            });
            let coletivo = coletivos[0];
            let objeto = {
                idAtendimento: atendimento
                , idLocalAtendimento: coletivo.IdLocalAtendimento
                , idLocalAtendimentoDivisao: coletivo.IdLocalAtendimentoDivisao
                , idProduto: coletivo.IdProduto
                , titulo: coletivo.DescrTituloProduto.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: coletivo.DescrProduto.replace("“", "").replace("”", "")
                , modalidade: coletivo.Modalidade.replace("Remota", "Online")
                , unidade: coletivo.Regional
                , tipo: obterTipo(coletivo.IdInstrumento)
                , preco: coletivo.Preco
                , cargaHoraria: coletivo.NrCargaHoraria
                , idAreaConhecimento: coletivo.IdAreaConhecimento
                , areaConhecimento: coletivo.AreaConhecimento
                , agenda: data
                , exclusivoPJ: false
                , maisInformacoes: coletivo.InformacoesAdicionais
                , complementoTitulo: coletivo.DescrComplementoTitulo
                , idAtendimentoKit: null //Código da primeira turma de um Kit
                , ordenacao: coletivo.Ordenacao
                , exclusivoPJ: coletivo.ExclusivoPJ
                , disponivel: coletivo.Disponivel == 1
                , destaque: coletivo.Destaque
                , ordenacao: coletivo.Ordenacao
                , divulgarMarketing: coletivo.DivulgarMarketing
                , certificado: coletivo.Certificado == 0? false : true
                , imagemGrande: coletivo.ImagemGrande
                , imagemMedia: coletivo.ImagemMedia
                , imagemPequena: coletivo.ImagemPequena
                , video: coletivo.Video
                , situacaoVideo: coletivo.SituacaoVideo
            }
            if (coletivo.Modalidade == 'Presencial') {
                let endereco = {
                    cep: coletivo.CEP
                    , logradouro: coletivo.Logradouro
                    , numero: coletivo.Numero
                    , complemento: coletivo.Complemento
                    , bairro: coletivo.Bairro
                    , cidade: coletivo.Cidade
                    , uf: coletivo.UF
                }
                objeto.endereco = endereco;                         
            }
            objeto.inscricao = `https://inscricao.sebraesp.com.br/produto/turma/${atendimento}`
            retorno.push(objeto);
        });
        //Remoção de entrevista empretec porque o instrumento é Informação Presencial
        retorno = retorno.filter(el => el.id != 264);
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.listarPorIdProduto = async (idProduto) => {
    try {

        let retorno = [];

        let result = idProduto ? await coletivo.listarPorIdProduto(idProduto) : await coletivo.listar();
        let resultFaq = await coletivo.consultarFaqPorIdProduto(idProduto)
        let atendimentos = result.map(a => a.IdAtendimento);
        atendimentos = [...new Set(atendimentos)];
        atendimentos.forEach(atendimento => {
            let coletivos = result.filter(el => el.IdAtendimento == atendimento);
            let data = [];            
            coletivos.forEach(coletivo => {
                data.push({ dataInicio: coletivo.DataInicio, dataFim: coletivo.DataFim });
            });
            let coletivo = coletivos[0];
            let objeto = {
                idAtendimento: atendimento
                , idLocalAtendimento: coletivo.IdLocalAtendimento
                , idLocalAtendimentoDivisao: coletivo.IdLocalAtendimentoDivisao
                , idProduto: coletivo.IdProduto
                , titulo: coletivo.DescrTituloProduto.replace(" (Presencial)", "").replace(" (Remoto)", "")
                , descricao: coletivo.DescrProduto.replace("“", "").replace("”", "")
                , modalidade: coletivo.Modalidade.replace("Remota", "Online")
                , unidade: coletivo.Regional
                , tipo: obterTipo(coletivo.IdInstrumento)
                , preco: coletivo.Preco
                , cargaHoraria: coletivo.NrCargaHoraria
                , idAreaConhecimento: coletivo.IdAreaConhecimento
                , areaConhecimento: coletivo.AreaConhecimento
                , agenda: data
                , exclusivoPJ: false
                , disponivel: coletivo.Disponivel == 1
                , maisInformacoes: coletivo.InformacoesAdicionais
                , complementoTitulo: coletivo.DescrComplementoTitulo
                , idAtendimentoKit: null //Código da primeira turma de um Kit
                , certificado: coletivo.Certificado == 0? false : true
                , imagemGrande: coletivo.ImagemGrande
                , imagemMedia: coletivo.ImagemMedia
                , imagemPequena: coletivo.ImagemPequena
                , faq: resultFaq || []
                , video: coletivo.Video
                , situacaoVideo: coletivo.SituacaoVideo
            }
            //if (coletivo.Modalidade == 'Presencial') {
                let endereco = {
                    cep: coletivo.CEP
                    , logradouro: coletivo.Logradouro
                    , numero: coletivo.Numero
                    , complemento: coletivo.Complemento
                    , bairro: coletivo.Bairro
                    , cidade: coletivo.Cidade
                    , uf: coletivo.UF
                }
                objeto.endereco = endereco;                         
            // }
            objeto.inscricao = `https://inscricao.sebraesp.com.br/produto/turma/${atendimento}`
            retorno.push(objeto);
        });
        //Remoção de entrevista empretec porque o instrumento é Informação Presencial
        retorno = retorno.filter(el => el.id != 264);
        return retorno;
    } catch (error) {
        throw error
    }
}

exports.consultarProduto = async (idProduto) => {
    try {
        let retorno = await coletivo.consultarProduto(idProduto);
        return retorno.map(elem => {
            return {
                ...elem, 
                tipo: obterTipo(elem.idInstrumento)
            }
        });
    } catch (error) {
        throw error;
    }
}

exports.listarColetivoPersonalizados = async () => {
    try {
        let retorno = await coletivo.listarColetivoPersonalizados();
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.consultaColetivoPersonalizado = async (idProduto) => {
    try {
        let retorno = await coletivo.consultarColetivoPersonalizado(idProduto);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.inserirColetivoPersonalizado = async (idProduto, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo) => {
    try {
        let retorno = await coletivo.inserirColetivoPersonalizado(idProduto, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.alterarColetivoPersonalizado = async (idProduto, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo) => {
    try {
        let retorno = await coletivo.alterarColetivoPersonalizado(idProduto, imagemGrande, imagemMedia, imagemPequena, video, situacaoVideo);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.excluirColetivoPersonalizado = async (idProduto) => {
    try {
        let retorno = await coletivo.excluirColetivoPersonalizado(idProduto);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.cadastrarFaqProduto = async (payload) => {
    try {
        // let dados = [];
        let retorno;

        for (let i = 0; i < payload.faq.length; i++){

            let existeDado = payload.faq[i].id != undefined && payload.faq[i].id != null?  await coletivo.consultarFaqProdutoPorIdFaq(payload.faq[i].id) : null
            let registro = {}
            
            if (!existeDado) {
                registro = {
                    IdProduto: payload.idProduto, 
                    NrOrdenacao: i + 1,
                    DsPergunta: payload.faq[i].pergunta,
                    DsResposta: payload.faq[i].resposta,                
                }    
                // dados.push(registro)           
                if (payload.faq[i].pergunta != "" && payload.faq[i].resposta != "")
                retorno = await coletivo.cadastrarFaqProduto(registro);
            }
            else {
                if (payload.faq[i].pergunta == "" || payload.faq[i].resposta == "") {
                    retorno = await excluirFaqProdutoPorIdFaq(payload.faq[i].id)
                }
                else {
                    registro = {
                        NrOrdenacao: i + 1,
                        DsPergunta: payload.faq[i].pergunta,
                        DsResposta: payload.faq[i].resposta,                
                        IdFaqProduto: payload.faq[i].id,
                        IdProduto: payload.idProduto
                    }  
                    retorno = await alterarFaqProduto(registro)
                }
            }
        }

        // retorno = await coletivo.cadastrarFaqProduto(dados);
        
        return retorno;
    } catch (error) {
        throw error;
    }
}

let alterarFaqProduto = async (registro) => {
    try {

        let retorno = await coletivo.alterarFaqProduto(registro);
        return retorno;
    } catch (error) {
        throw error;
    }
}

let excluirFaqProdutoPorIdFaq = async (idFaqProduto) => {
    try {
        let retorno = await coletivo.excluirFaqProdutoPorIdFaq(idFaqProduto);
        return retorno;
    } catch (error) {
        throw error;
    }
}

exports.excluirFaqProdutoPorIdProduto = async (idProduto) => {
    try {
        let retorno = await coletivo.excluirFaqProdutoPorIdProduto(idProduto)
        return retorno;
    }
    catch (error) {
        throw error
    }
}

exports.consultarFaqPorIdProduto = async (idProduto) => {
    try {
        let retorno = await coletivo.consultarFaqPorIdProduto(idProduto)
        return retorno;
    } catch (error) {
        throw error
    }
}
