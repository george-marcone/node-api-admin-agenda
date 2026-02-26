'use strict'
const evento = require('../controllers/evento');
const coletivo = require('../dominio/coletivo');
const execucaoKit = require('../dominio/execucaoKit');
const campanhas = require('../dominio/campanha');
const consultoria = require('../dominio/consultoria');
const consultoriactrl = require('../controllers/consultoria');
const material = require('../dominio/material-apoio');
const local = require('../dominio/local');
const config = require('../config');
const envio = require('../services/custom-messages');
const util = require('../util/index');
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { ordenacao } = require('../repositories/consultoria');



let listarPorLocal = async (idLocal, Admin = false) => {
  try {
    let eventos = await coletivo.listar(idLocal);
    const eventosDisponiveis = await coletivo.listarDisponiveis(idLocal);

    eventos = await Promise.all(eventos.map(async evento => {
      let eventoPublicado = eventosDisponiveis.find(eventoDisponivel => eventoDisponivel.idAtendimento === evento.idAtendimento);

      if (eventoPublicado) {
        evento.disponivel = eventoPublicado.disponivel;
        evento.exclusivoPJ = eventoPublicado.exclusivoPJ;
        evento.destaque = eventoPublicado.destaque;
        evento.ordenacao = eventoPublicado.ordenacao;
        evento.divulgarMarketing = eventoPublicado.divulgarMarketing;
      } else {
        evento.disponivel = false;
        evento.exclusivoPJ = false;
        evento.destaque = false;
        evento.ordenacao = 0;
        evento.divulgarMarketing = false;
      }
      evento.nomeCampanha = ''
      evento.imgCard = ''
      evento.campanhaTag = ''
      evento.campanhaCorTag = ''
      evento.consultoria = false;

      return evento;
    }));

    if(idLocal != config.Parametros.idCentralAtendimento){
        const eventosDisponiveis = await coletivo.listarDisponiveis(config.Parametros.idCentralAtendimento);

        eventos = eventos.filter(e => {
          if(e.modalidade == 'Online' && e.idLocalAtendimento == config.Parametros.idCentralAtendimento){
            let eventoPublicado = eventosDisponiveis.find(eventoDisponivel => eventoDisponivel.idAtendimento === e.idAtendimento);
            return eventoPublicado
          }
          return true;
      });
    }

    let eventosKit = await execucaoKit.listar(idLocal);

    if (eventosKit.length) {
      const eventosKitDisponiveis = await execucaoKit.listarDisponiveis(idLocal);
      const campanhaskit = await campanhas.listarCampanhaPorStatus(49);
    
      eventosKit = await Promise.all(eventosKit.map(async eventoKit => {
        // Encontra o eventoKitDisponivel correspondente
        let eventoPublicadoKit = eventosKitDisponiveis.find(eventoKitDisponivel => eventoKitDisponivel.idAtendimento === eventoKit.idAtendimento
          || eventoKitDisponivel.idAtendimentoKit === eventoKit.idAtendimento
        );
    
        // Encontra a campanha correspondente
        let campanhaKit = campanhaskit.find(campanha => campanha.codigoDoKit === eventoKit.idProduto);
    
        // Atualiza as propriedades do eventoKit com base em eventoPublicadoKit
        if (eventoPublicadoKit) {
          eventoKit.disponivel = eventoPublicadoKit.disponivel;
          eventoKit.exclusivoPJ = eventoPublicadoKit.exclusivoPJ;
          eventoKit.destaque = eventoPublicadoKit.destaque;
          eventoKit.ordenacao = eventoPublicadoKit.ordenacao;
          eventoKit.divulgarMarketing = eventoPublicadoKit.divulgarMarketing;
          eventoKit.nomeCampanha = ''                    
          eventoKit.imgCard = ''
          eventoKit.campanhaTag = ''
          eventoKit.campanhaCorTag = ''
        }
        else {
          eventoKit.disponivel = false;
          eventoKit.exclusivoPJ = false;
          eventoKit.destaque = false;
          eventoKit.ordenacao = 0;
          eventoKit.divulgarMarketing = false;
          eventoKit.nomeCampanha = ''          
          eventoKit.imgCard = ''
          eventoKit.campanhaTag = ''
          eventoKit.campanhaCorTag = ''
        }
        if (campanhaKit) {
          eventoKit.disponivel = true // Curso de campanha deve ser publicado
          eventoKit.exclusivoPJ = eventoPublicadoKit === true? eventoPublicadoKit.exclusivoPJ : false;
          eventoKit.destaque = eventoPublicadoKit === true? eventoPublicadoKit.destaque : false;
          eventoKit.ordenacao = eventoPublicadoKit === true ? eventoPublicadoKit.ordenacao : 0;
          eventoKit.divulgarMarketing = true  // Curso de campanha deve ser impulsionado
          eventoKit.nomeCampanha = campanhaKit.nome;
          eventoKit.imgCard = campanhaKit.imgCard;
          eventoKit.campanhaTag = campanhaKit.tag;
          eventoKit.campanhaCorTag = campanhaKit.cor;
        }         
        
        eventoKit.consultoria = false;
    
        return eventoKit;
      }));
    

      if(idLocal != config.Parametros.idCentralAtendimento){
          const eventosKitCentralDisponiveis = await execucaoKit.listarDisponiveis(config.Parametros.idCentralAtendimento);

          eventosKit = eventosKit.filter(e => {
            if(e.modalidade == 'Online' && e.idLocalAtendimento == config.Parametros.idCentralAtendimento){
              let eventoPublicadoKit = eventosKitCentralDisponiveis.find(eventoKitDisponivel => eventoKitDisponivel.idAtendimento === e.idAtendimento);
              return eventoPublicadoKit
            }
            return true;
        });
      }
    } 

    
    if (!Admin) {
      let consultorias = await consultoria.listar(idLocal);
      const consultoriasDisponiveis = await consultoria.listarDisponiveis(idLocal);
      let consultoriasList = await Promise.all(consultorias.map(async item => {
        let consultoriaPublicada = consultoriasDisponiveis.find(consultoriaDisponiveis => consultoriaDisponiveis.idConsultoria === item.idProduto);

        if (consultoriaPublicada) {        
          item.disponivel = true;
          item.destaque = consultoriaPublicada.destaque;
          item.ordenacao = consultoriaPublicada.ordenacao;
          item.idLocalAtendimento = consultoriaPublicada.idLocal;
          item.exibirFormulario = consultoriaPublicada.exibirFormulario;
          item.divulgarMarketing = consultoriaPublicada.divulgarMarketing;
        } else {
          item.disponivel = false;
          item.destaque = false;
          item.ordenacao = 0;
          item.idLocalAtendimento = idLocal;
          item.exibirFormulario = true;
          item.divulgarMarketing = false;
        }
        item.nomeCampanha = ''                        
        item.imgCard = ''
        item.campanhaTag = ''
        item.campanhaCorTag = ''
        item.consultoria = true;
        return item;
      }));

      // Remover duplicidades com base no ID da consultoria
      consultoriasList = consultoriasList.filter((item, index, self) =>
      index === self.findIndex(t => t.idProduto === item.idProduto));
      eventos = eventos.concat(consultoriasList);      
    }

      eventos = eventos.concat(eventosKit);

      eventos = eventos.sort((a, b) => {
        if (a.ordenacao > 0 && b.ordenacao > 0) {
          return a.ordenacao - b.ordenacao;
        } else if (a.ordenacao > 0) {
          return -1;
        } else if (b.ordenacao > 0) {
          return 1;
        } else {
          return 0;
        }
      })
        .sort((a, b) => {
          if (a.disponivel && !b.disponivel) {
            return -1
          } else if (!a.disponivel && b.disponivel) {
            return 1
          } else {
            return 0
          }
        });
    
    return eventos;
  } catch (error) {
    envio.mensagemPadrao(error, res, 400)
    // throw error;
  }
}

exports.listarDisponiveis = async (req, res) => {
  try {  
    let eventos = [];
    eventos = await listarDisponiveisPorLocal(req.params.idLocal);
    //Filtra eventos que contenham nas listas habilitadas pelos locais 
     
    if (eventos) res.status(200).send(eventos);
    else
      throw 'Não foram encontradas eventos coletivos disponíveis'
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

//Lista somente disponíveis
let listarDisponiveisPorLocal = async (idLocal, idAtendimento) => {
  try {
    
    let eventos =[];
    eventos = await listarPorLocal(idLocal);
    if (eventos.length) eventos = eventos.filter(evento => (evento.disponivel == true && (idAtendimento != null? evento.idAtendimento === idAtendimento : true)));
    return eventos;

  } catch (error) {
     envio.mensagemPadrao(error, res, 400)
    // throw error;
  }
}

exports.listar = async (req, res) => {
  try {
    let eventos = [];
    eventos = await listarPorLocal(req.params.idLocal, true);
    if (eventos)
      res.status(200).send(eventos);
    else
      throw 'Não foram encontradas eventos coletivos disponíveis'
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400, req)  
  }
}

exports.disponibilizar = async (req, res) => {
  try {
    //Verifica se a turma é de produto ou KIT
    let resultado = await execucaoKit.consultar(req.body.idAtendimento);
    let eColetivo = true
    if (resultado.length) {
      eColetivo = false
      await execucaoKit.disponibilizar(req.body.idLocal, req.body.idAtendimento, req.body.exclusivoPJ, req.body.divulgarMarketing);
    }
    else {
      eColetivo = true
      await coletivo.disponibilizar(req.body.idLocal, req.body.idAtendimento, req.body.exclusivoPJ, req.body.divulgarMarketing);
    }

    let informacoesAtualizadas = await atualizacoesCursoDisponivel(eColetivo, req.body.idAtendimento, req.body.idLocal)

    envio.mensagemPadraoComObjeto(null, res, 203, informacoesAtualizadas)
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.disponibilizarEmLote = async (req, res) => {
  // Categorias: presencial - online
  try {
    let eventos = await listarPorLocal(req.body.idLocal);
    switch (req.body.categoria) {
      case config.Parametros.categoria.presencial: eventos = eventos.filter(evento => (evento.disponivel == !req.body.disponivel && evento.modalidade == "Presencial" && evento.idLocalAtendimento == req.body.idLocal)); break;
      case config.Parametros.categoria.online: eventos = eventos.filter(evento => (evento.disponivel == !req.body.disponivel && evento.modalidade == "Online")); break;      
      default: throw ("Informe uma categoria disponível: presencial / online");
    }
    // Eventos ExecucaoKit
    let eventosKit = await execucaoKit.listar(req.body.idLocal);
    let idAtendimentosKit = eventosKit.map(a => a.idAtendimento);

    // Eventos Central de Atendimento no caso da categoria ser online
    let eventosCentral = null      
    let idAtendimentoCentral = null
    if (req.body.categoria == config.Parametros.categoria.online) {
      eventosCentral = await execucaoKit.listar(config.Parametros.idCentralAtendimento);
      idAtendimentoCentral = eventosCentral.map(a => a.idAtendimento);      
    }
    
    for (let evento of eventos) {
      if (idAtendimentosKit.includes(evento.idAtendimento))
        await execucaoKit.disponibilizar(req.body.idLocal, evento.idAtendimento, false);
      else if (req.body.categoria == config.Parametros.categoria.online && idAtendimentoCentral && idAtendimentoCentral.includes(evento.idAtendimento))
        await execucaoKit.disponibilizar(req.body.idLocal, evento.idAtendimento, false);
      else
        await coletivo.disponibilizar(req.body.idLocal, evento.idAtendimento, false);
    }
    envio.mensagemPadrao(null, res, 201)
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.atualizarPJ = async (req, res) => {
  try {
    //Verifica se a turma é de produto ou KIT
    let retorno
    let eColetivo = true
    let resultado = await execucaoKit.consultar(req.body.idAtendimento);
    if (resultado.length) {
      eColetivo = false
      retorno = await execucaoKit.atualizarPJ(req.body.idLocal, req.body.idAtendimento, req.body.exclusivoPJ);
    }
    else {
      eColetivo = true
      retorno = await coletivo.atualizarPJ(req.body.idLocal, req.body.idAtendimento, req.body.exclusivoPJ);
    }

    let informacoesAtualizadas = await atualizacoesCursoDisponivel(eColetivo, req.body.idAtendimento, req.body.idLocal)

    if (retorno) envio.mensagemPadraoComObjeto(null, res, 203, informacoesAtualizadas) // envio.mensagemPadrao(null, res, 201)
    else throw "Não foi possível realizar a atualização"
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.destacarCurso = async (req, res) => {
  try {
    let eColetivo = true
    const cursoDestaque = {
      Destaque: req.body.destaque == true ? 1 : 0,
      Ordenacao: 0,
      IdAtendimento: req.body.idAtendimento,
      IdLocal: req.body.idLocal
    }
    let retorno
    let resultado = await execucaoKit.consultar(req.body.idAtendimento);
    if (resultado.length) {
      eColetivo = false
      retorno = await execucaoKit.destacarCurso(cursoDestaque);      
    }
    else {
      eColetivo = true
      retorno = await coletivo.destacarCurso(cursoDestaque);      
    }

    let informacoesAtualizadas = await atualizacoesCursoDisponivel(eColetivo, req.body.idAtendimento, req.body.idLocal)

    if (retorno) envio.mensagemPadraoComObjeto(null, res, 203, informacoesAtualizadas) // if (retorno) envio.mensagemPadrao(null, res, 203)
    else throw "Não foi possível realizar o destaque do curso"
  }
  catch (e) {
     envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.priorizarCursos = async (req, res) => {
  try {
    const arrayOrdenacao = req.body.payload;
    let retorno;   

    if (arrayOrdenacao) {

      for (let index = 0; index < arrayOrdenacao.length; index++) {
        const curso = arrayOrdenacao[index];
        const cursoOrdenar = {
          Ordenacao: index + 1,
          IdAtendimento: curso.idAtendimento,
          IdLocal: curso.idLocal
        };

        retorno = await execucaoKit.priorizarCurso(cursoOrdenar);

        if (!retorno) {
          retorno = await coletivo.priorizarCurso(cursoOrdenar);          
        }
      }
    }

    if (retorno) envio.mensagemPadrao(null, res, 203)
    else throw "Não foi possível realizar a priorização dos cursos"

  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.editarEvento = async (req, res) => {
  try {
    let eColetivo = true
    let retorno
    let resultado = await execucaoKit.consultar(req.body.idAtendimento);

    let idLocal = req.body.idLocal
    let idAtendimento = req.body.idAtendimento

    if (resultado.length) {
      eColetivo = false
      await execucaoKit.atualizarPJ(req.body.idLocal, req.body.idAtendimento, req.body.exclusivoPJ == true ? 1 : 0);
      let resultado = await execucaoKit.consultarMaisInformacoes(req.body.idAtendimento, idLocal);
      
      if(resultado.length){ 
        retorno = await execucaoKit.editarMaisInformacoes(req.body.idAtendimento, req.body.maisInformacoes, req.body.complementoTitulo, idLocal);
      } else {
        retorno = await execucaoKit.inserirMaisInformacoes(req.body.idAtendimento, req.body.maisInformacoes, req.body.complementoTitulo, idLocal);
      }

      await execucaoKit.marketing(req.body.idAtendimento, idLocal, req.body.divulgarMarketing);    
    } else {
      eColetivo = true
      await coletivo.atualizarPJ(req.body.idLocal, req.body.idAtendimento, req.body.exclusivoPJ == true ? 1 : 0);
      let resultado = await coletivo.consultarMaisInformacoes(req.body.idAtendimento, idLocal);
      if(resultado.length){ 
        retorno = await coletivo.editarMaisInformacoes(req.body.idAtendimento, req.body.maisInformacoes, req.body.complementoTitulo, idLocal);
      } else {
        retorno = await coletivo.inserirMaisInformacoes(req.body.idAtendimento, req.body.maisInformacoes, req.body.complementoTitulo, idLocal);
      }

      await coletivo.marketing(req.body.idAtendimento,idLocal, req.body.divulgarMarketing);        
    }

    let informacoesAtualizadas = await atualizacoesCurso(eColetivo, idAtendimento, idLocal)
    
    if (retorno) envio.mensagemPadraoComObjeto(null, res, 203, informacoesAtualizadas)
    else throw "Não foi possível atualizar o curso"
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.marketing = async (req, res) => {
  try {

    let retorno
    let resultado = await execucaoKit.consultar(req.body.idAtendimento);
    if (resultado.length) {
      retorno = await execucaoKit.marketing(req.body.idAtendimento, req.body.idLocal, req.body.divulgarMarketing ? 1 : 0);      
    }
    else {
      retorno = await coletivo.marketing(req.body.idAtendimento, req.body.idLocal, req.body.divulgarMarketing ? 1 : 0);        
    }
    if (retorno) envio.mensagemPadrao(null, res, 203)
    else throw "Não foi possível realizar o destaque do curso"
  }
  catch (e) {
     envio.mensagemPadrao(e, res, 400, req)
  }
}

let atualizacoesCurso = async (eColetivo, idAtendimento, idLocal) => { 
  try {
    let infoAdicionaisCurso = null 
    let cursoDisponivel = null
    if (eColetivo) {
      cursoDisponivel = await coletivo.consultarInformacoesAtualizadas(idAtendimento, idLocal);
      if (cursoDisponivel && cursoDisponivel.length) {
        cursoDisponivel = cursoDisponivel[0]
      }
      infoAdicionaisCurso = await coletivo.consultar(idAtendimento)
      if (infoAdicionaisCurso && infoAdicionaisCurso.length) {
        infoAdicionaisCurso = infoAdicionaisCurso[0]
      }
    }
    else {
      cursoDisponivel = await execucaoKit.consultarInformacoesAtualizadas(idAtendimento, idLocal);
      if (cursoDisponivel && cursoDisponivel.length) {
        cursoDisponivel = cursoDisponivel[0]
      }
      infoAdicionaisCurso = await execucaoKit.consultar(idAtendimento)
      if (infoAdicionaisCurso && infoAdicionaisCurso.length) {
        infoAdicionaisCurso = infoAdicionaisCurso[0]
      }
    }   
      // merge dos dois objetos formados acima
      let informacoesAtualizadas = util.transformarPropriedadesEmMinusculas(Object.assign({}, cursoDisponivel, infoAdicionaisCurso));  
      return informacoesAtualizadas;    
  } catch (e) {
    return(e)
  }
}

let atualizacoesCursoDisponivel = async (eColetivo, idAtendimento, idLocal) => { 
  try {
    let cursoDisponivel = null
    if (eColetivo) {
      cursoDisponivel = await coletivo.consultarInformacoesAtualizadas(idAtendimento, idLocal);
      if (cursoDisponivel && cursoDisponivel.length) {
        cursoDisponivel = cursoDisponivel[0]
      }
    }
    else {
      cursoDisponivel = await execucaoKit.consultarInformacoesAtualizadas(idAtendimento, idLocal);
      if (cursoDisponivel && cursoDisponivel.length) {
        cursoDisponivel = cursoDisponivel[0]
      }
    }   
      // merge dos dois objetos formados acima
      let informacoesAtualizadas = util.transformarPropriedadesEmMinusculas(cursoDisponivel);  
      return informacoesAtualizadas;    
  } catch (e) {
    return(e)
  }
}

exports.listarQtdDisponiveis = async (req, res) => {
  try {     

    let qtdPresencial = 0;
    let qtdOnline = 0;
    let qtdConsultoria = 0;
    
    const qtdadeConsultoria = await consultoriactrl.listarDisponiveisLocal(req);
    
    qtdConsultoria = qtdadeConsultoria != null && qtdadeConsultoria != undefined ? qtdadeConsultoria.length : 0 // qtdConsultoria[0]['consultoria']

    let qtdEbook = await material.qtdEbookDisponivel();
    qtdEbook = qtdEbook[0]['ebook']    
    
    let presencial = await evento.listarPresencialDisponivel(req); 

    if (presencial && presencial.length > 0) {

      const idsUnicos = new Set();
      const eventosUnicos = presencial.filter(evento => {
        if (!idsUnicos.has(evento.idProduto)) {
          idsUnicos.add(evento.idProduto);
          return true;
        }
        return false;
      });

      qtdPresencial = eventosUnicos != null && eventosUnicos != undefined ? eventosUnicos.length : 0;
    }
    else
      qtdPresencial = 0 


    let online = await evento.listarOnlineDisponiveis(req)

    if (online && online.length > 0) {

      const idsUnicos = new Set();
      const eventosUnicos = online.filter(evento => {
        if (!idsUnicos.has(evento.idProduto)) {
          idsUnicos.add(evento.idProduto);
          return true;
        }
        return false;
      });

      qtdOnline = eventosUnicos != null && eventosUnicos != undefined ? eventosUnicos.length : 0;
    }
    else
      qtdOnline = 0     
    
    //Filtra eventos que contenham nas listas habilitadas pelos locais 
    const eventos = {
      presencial: qtdPresencial,
      online: qtdOnline,
      consultoria: qtdConsultoria,      
      ebook: qtdEbook
    };
     
    if (eventos) res.status(200).send(eventos);
    else
      throw 'Não foram encontradas eventos coletivos disponíveis'
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.listarPresenciaisDisponiveis = async (req, res) => {
  try {  
    let eventos = [];
    eventos = await listarPresencialPorLocal(req.params.idLocal, res);
    //Filtra eventos que contenham nas listas habilitadas pelos locais 
     
    if (eventos) res.status(200).send(eventos);
    else
      throw 'Não foram encontradas eventos coletivos disponíveis'
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

let listarPresencialPorLocal = async (idLocal, res) => {
  try {
    let eventos = await coletivo.listarPorModalidade(idLocal, "Presencial");
    const eventosDisponiveis = await coletivo.listarDisponiveis(idLocal);

    eventos.forEach(async evento => {
      let eventoPublicado = eventosDisponiveis.find(eventoDisponivel => eventoDisponivel.idAtendimento === evento.idAtendimento);

      if (eventoPublicado) {
        evento.disponivel = eventoPublicado.disponivel;
        evento.exclusivoPJ = eventoPublicado.exclusivoPJ;
        evento.destaque = eventoPublicado.destaque;
        evento.ordenacao = eventoPublicado.ordenacao;
        evento.divulgarMarketing = eventoPublicado.divulgarMarketing;
      } else {
        evento.disponivel = false;
        evento.exclusivoPJ = false;
        evento.destaque = false;
        evento.ordenacao = 0;
        evento.divulgarMarketing = false;
      }
      evento.nomeCampanha = ''          
      evento.imgCard = ''
      evento.campanhaTag = ''
      evento.campanhaCorTag = ''
      evento.consultoria = false;

      return evento;
    });

    let eventosKit = await execucaoKit.listarPorModalidade(idLocal, "Presencial");    

    if (eventosKit.length) {
      const eventosKitDisponiveis = await execucaoKit.listarDisponiveis(idLocal);
      const campanhaskit = await campanhas.listarCampanhaPorStatus(49);
    
      eventosKit = await Promise.all(eventosKit.map(async eventoKit => {
        // Encontra o eventoKitDisponivel correspondente
        let eventoPublicadoKit = eventosKitDisponiveis.find(eventoKitDisponivel => eventoKitDisponivel.idAtendimento === eventoKit.idAtendimento
          || eventoKitDisponivel.idAtendimentoKit === eventoKit.idAtendimento
        );
    
        // Encontra a campanha correspondente
        let campanhaKit = campanhaskit.find(campanha => campanha.codigoDoKit === eventoKit.idProduto);
    
        // Atualiza as propriedades do eventoKit com base em eventoPublicadoKit
        if (eventoPublicadoKit) {
          eventoKit.disponivel = eventoPublicadoKit.disponivel;
          eventoKit.exclusivoPJ = eventoPublicadoKit.exclusivoPJ;
          eventoKit.destaque = eventoPublicadoKit.destaque;
          eventoKit.ordenacao = eventoPublicadoKit.ordenacao;
          eventoKit.divulgarMarketing = eventoPublicadoKit.divulgarMarketing;          
          eventoKit.nomeCampanha = ''          
          eventoKit.imgCard = ''
          eventoKit.campanhaTag = ''
          eventoKit.campanhaCorTag = ''
        } else {
          eventoKit.disponivel = false;
          eventoKit.exclusivoPJ = false;
          eventoKit.destaque = false;
          eventoKit.ordenacao = 0;
          eventoKit.divulgarMarketing = false;
          eventoKit.nomeCampanha = ''          
          eventoKit.imgCard = ''
          eventoKit.campanhaTag = ''
          eventoKit.campanhaCorTag = ''
        }  

        if (campanhaKit) {
          eventoKit.disponivel = true // Curso de campanha deve ser publicado
          eventoKit.exclusivoPJ = eventoPublicadoKit === true? eventoPublicadoKit.exclusivoPJ : false;
          eventoKit.destaque = eventoPublicadoKit === true? eventoPublicadoKit.destaque : false;
          eventoKit.ordenacao = eventoPublicadoKit === true ? eventoPublicadoKit.ordenacao : 0;
          eventoKit.divulgarMarketing = true  // Curso de campanha deve ser impulsionado
          eventoKit.nomeCampanha = campanhaKit.nome;
          eventoKit.imgCard = campanhaKit.imgCard;
          eventoKit.campanhaTag = campanhaKit.tag;
          eventoKit.campanhaCorTag = campanhaKit.cor;
        }       
        
        eventoKit.consultoria = false;
    
        return eventoKit;
      }));
    } 

    eventos = eventos.concat(eventosKit);
    
      eventos = eventos.sort((a, b) => {
        if (a.ordenacao > 0 && b.ordenacao > 0) {
          return a.ordenacao - b.ordenacao;
        } else if (a.ordenacao > 0) {
          return -1;
        } else if (b.ordenacao > 0) {
          return 1;
        } else {
          return 0;
        }
      })
        .sort((a, b) => {
          if (a.disponivel && !b.disponivel) {
            return -1
          } else if (!a.disponivel && b.disponivel) {
            return 1
          } else {
            return 0
          }
        });
    
        eventos = eventos.filter(evento => evento.disponivel === true);
    
    return eventos;
  } catch (error) {
    envio.mensagemPadrao(error, res, 400)
    // throw error;
  }
}

exports.listarOnlinesDisponiveis = async (req, res) => {
  try {  
    let eventos = [];
    eventos = await listarDisponiveisPorLocal(req.params.idLocal);
    const dataAtual = new Date();

    eventos = eventos.filter((evento) => {      
      return evento.modalidade === "Online" && evento.consultoria === false;});

    eventos = eventos.filter((evento) => {
      const dataInicioEvento = new Date(evento.agenda[evento.agenda.length-1].dataInicio);
      return dataInicioEvento >= dataAtual;
    });
     
    if (eventos) res.status(200).send(eventos);
    else
      throw 'Não foram encontradas eventos coletivos disponíveis'
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.listarQtdDisponiveisSebraeAqui = async (req, res) => {
  try {     

    let qtdPresencial = 0;
    let qtdOnline = 0;

    const sebraeAqui = await local.consultarSebraeAquiPorSlug(req.params.slug);
    if (!sebraeAqui.IdLocalMatriz) throw "Não foi encontrado o local do curso na consulta";

    let qtdConsultoria = await consultoria.qtdConcultoriaDisponivel(sebraeAqui.IdLocalMatriz);
    qtdConsultoria = qtdConsultoria[0]['consultoria']

    let qtdEbook = await material.qtdEbookDisponivel();
    qtdEbook = qtdEbook[0]['ebook']    

    let presencial = await execucaoKit.consultarQtdExecucaoKitPresencialSebraeAqui(sebraeAqui.IdLocal);    
      qtdPresencial = presencial[0]['presencial']
    
    presencial = await coletivo.consultarQtdColetivoPresencialSebraeAqui(sebraeAqui.IdLocal);
    qtdPresencial = qtdPresencial + presencial[0]['presencial']
    
    let online = await execucaoKit.consultarQtdExecucaoKitOnlineSebraeAqui(sebraeAqui.IdLocal);
    qtdOnline = online[0]['online']
    
    online = await coletivo.consultarQtdColetivoOnlineSebraeAqui(sebraeAqui.IdLocal);
    qtdOnline = qtdOnline + online[0]['online']

    //Filtra eventos que contenham nas listas habilitadas pelos locais 
    const eventos = {
      presencial: qtdPresencial,
      online: qtdOnline,
      consultoria: qtdConsultoria,      
      ebook: qtdEbook
    };
     
    if (eventos) res.status(200).send(eventos);
    else
      throw 'Não foram encontradas eventos coletivos disponíveis'
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

// Lista eventos disponíveis filtrando apenas aqueles que pertencem a determinado Sebrae Aqui
exports.listarPorModalidadeDisponiveisSebraeAqui = async (req, res) => {
  try {
    let eventos =[];
    const sebraeAqui = await local.consultarSebraeAquiPorSlug(req.params.slug);
    if (!sebraeAqui.IdLocalMatriz) throw "Não foi encontrado o local do curso na consulta";
    eventos = await listarDisponiveisPorLocal(sebraeAqui.IdLocalMatriz);
    if (eventos.length) eventos = eventos.filter(evento => (evento.idLocalAtendimentoDivisao == sebraeAqui.IdLocal));
    
    if (!eventos)
      throw 'Não foram encontrados eventos coletivos disponíveis para o Sebrae Aqui pesquisado'
    else {
      if(req.originalUrl.toString().includes('presenciais') || req.originalUrl.toString().includes('presencial'))
        eventos = eventos.filter((evento) => evento.modalidade === "Presencial");
      else
        eventos = eventos.filter((evento) => evento.modalidade === "Online");
      res.status(200).send(eventos);         
    }
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.listarDisponiveisPorProdutoELocal = async (req, res) => {
  try { 
     
    let eventos = [];
    eventos = await listarDisponiveisPorLocal(req.body.idLocal, req.body.idAtendimento ? req.body.idAtendimento : null );
    //Filtra eventos que contenham nas listas habilitadas pelos locais 
    eventos = eventos.filter((evento) => evento.idProduto === req.body.idProduto || evento.idKit === req.body.idProduto);
    
    if (eventos && eventos.length > 0) {
      for (let i = 0; i < eventos.length; i++){
        eventos[i].faq = await listarFaq(eventos[i])
      }
    }

    if (eventos) res.status(200).send(eventos);
    else
      throw 'Não foram encontradas eventos coletivos disponíveis'
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}


exports.listarPresencialDisponivel = async (req, res) => {
  try {
    let eventos = [];
    eventos = await listarPresencialPorLocal(req.params.idLocal, res);
    if (eventos)
      return eventos
    else
      return null;
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

exports.listarDisponiveisPorProduto = async (req, res) => {
  try { 
    let eventos = await listarDisponiveisPorIdProduto(req.params.idProduto);    
    let faqProduto = await coletivo.consultarFaqPorIdProduto(req.params.idProduto);
    let faqArray = faqProduto ? faqProduto.slice(0, 5) : [];

      // Transforma cada item do faqProduto
      faqArray = faqArray.map(faq => ({
        id: faq.idFaqProduto || null,
        pergunta: faq.pergunta || "",
        resposta: faq.resposta || "",
        ordenacao: faq.ordenacao || ""
      }));

      // Completa o array para garantir que tenha sempre 5 registros
      // while (faqArray.length < 5) {
      //   faqArray.push({
      //     id: null,
      //     pergunta: "",
      //     resposta: "",
      //     ordenacao: ""
      //   });
      // }
    
    if (eventos && eventos.length > 0) {
      // Adiciona a propriedade `faq` a cada evento
      eventos = eventos.map(evento => ({
        ...evento,
        faq: faqArray
      }));
      
      return res.status(200).send(eventos);
    } else {
      eventos = await coletivo.consultarProduto(req.params.idProduto);
      
      if (eventos && eventos.length > 0) {
        
        eventos = eventos.map(evento => ({
          ...evento,
          faq: faqArray
        }));

        return res.status(200).send(eventos);
      } else {
        throw 'Não foram encontradas eventos coletivos disponíveis';
      }
    } 
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req);
  }
};


exports.listarDisponiveisPorKit = async (req, res) => {
  try { 
    
    let eventos = [];
    eventos = await listarDisponiveisPorIdKit(req.params.idKit);    
    let faqKit = await execucaoKit.consultarFaqPorIdKit(req.params.idKit);
    let faqArray = faqKit ? faqKit.slice(0, 5) : [];

      // Transforma cada item do faqProduto
      faqArray = faqArray.map(faq => ({
        id: faq.idFaqKit || null,
        pergunta: faq.pergunta || "",
        resposta: faq.resposta || "",
        ordenacao: faq.ordenacao || ""
      }));

      // Completa o array para garantir que tenha sempre 5 registros
      // while (faqArray.length < 5) {
      //   faqArray.push({
      //     id: null,
      //     pergunta: "",
      //     resposta: "",
      //     ordenacao: ""
      //   });
      // }
     
    if (eventos && eventos.length > 0) {
      
      eventos = eventos.map(evento => ({
        ...evento,
        faq: faqArray
      }));

      res.status(200).send(eventos);
    }else{
        eventos = await execucaoKit.consultarKit(req.params.idKit);        
        
      if (eventos && eventos.length > 0) {
        
        eventos = eventos.map(evento => ({
          ...evento,
          faq: faqArray
        }));
  
        res.status(200).send(eventos);

      }
      else
        throw 'Não foram encontradas eventos de kit disponíveis'      
    }
  } catch (e) {
    envio.mensagemPadrao(e, res, 400, req)
  }
}

//Lista somente disponíveis
let listarDisponiveisPorIdProduto = async (idProduto) => {
  // 'https://homologacao-agenda.sebraesp.com.br/produto/5929'
  try {
    let eventos = [];
    eventos = await listarPorProduto(idProduto);

    const eventosOriginais = [...eventos]; 

    if (eventos.length) {
      eventos = eventos.filter(evento => evento.disponivel == true);
    }

    if (eventos.length == 0) {
      if (eventosOriginais && eventosOriginais.length) {
        eventos.push(eventosOriginais[0])
      }
    }

    return eventos;
  }
  catch (error)
  {
    envio.mensagemPadrao(error, res, 400);
    // throw error;
  }
};

//Lista somente disponíveis
let listarDisponiveisPorIdKit = async (idKit) => {
  // 'https://homologacao-agenda.sebraesp.com.br/produto/5929'
  try {
    let eventos = [];
    eventos = await listarPorKit(idKit);

    const eventosOriginais = [...eventos]; 

    if (eventos.length) {
      eventos = eventos.filter(evento => evento.disponivel == true);
    }

    if (eventos.length == 0) {
      if (eventosOriginais && eventosOriginais.length) {
        eventos.push(eventosOriginais[0])
      }
    }

    return eventos;

    // return {
    //   original: eventosOriginais,
    //   filtrados: eventos
    // };

  } catch (error) {
    envio.mensagemPadrao(error, res, 400);
    // throw error;
  }
};

let listarPorProduto = async (idProduto) => {
  try {
    let eventos = await coletivo.listarPorIdProduto(idProduto);
    const eventosDisponiveis = await coletivo.listarDisponiveisIdProduto(idProduto);

    eventos.forEach(async evento => {
      let eventoPublicado = eventosDisponiveis.find(eventoDisponivel => eventoDisponivel.idAtendimento === evento.idAtendimento);

      if (eventoPublicado) {
        evento.disponivel = eventoPublicado.disponivel;
        evento.exclusivoPJ = eventoPublicado.exclusivoPJ;
        evento.destaque = eventoPublicado.destaque;
        evento.ordenacao = eventoPublicado.ordenacao;
        evento.divulgarMarketing = eventoPublicado.divulgarMarketing;
      } else {
        evento.disponivel = false;
        evento.exclusivoPJ = false;
        evento.destaque = false;
        evento.ordenacao = 0;
        evento.divulgarMarketing = false;
      }
      evento.nomeCampanha = ''
      evento.imgCard = ''
      evento.campanhaTag = ''
      evento.campanhaCorTag = ''
      evento.consultoria = false;

      return evento;
    });

      eventos = eventos.sort((a, b) => {
        if (a.ordenacao > 0 && b.ordenacao > 0) {
          return a.ordenacao - b.ordenacao;
        } else if (a.ordenacao > 0) {
          return -1;
        } else if (b.ordenacao > 0) {
          return 1;
        } else {
          return 0;
        }
      })
        .sort((a, b) => {
          if (a.disponivel && !b.disponivel) {
            return -1
          } else if (!a.disponivel && b.disponivel) {
            return 1
          } else {
            return 0
          }
        });
    
    return eventos;
  } catch (error) {
    envio.mensagemPadrao(error, res, 400)
    // throw error;
  }
}

let listarPorKit = async (idKit) => {
  try {
    
    let eventosKit = await execucaoKit.listarPorIdKit(idKit);

    if (eventosKit.length) {
      const eventosKitDisponiveis = await execucaoKit.listarDisponiveisIdKit(idKit);     
    
      eventosKit = await Promise.all(eventosKit.map(async eventoKit => {
        // Encontra o eventoKitDisponivel correspondente
        let eventoPublicadoKit = eventosKitDisponiveis.find(eventoKitDisponivel => eventoKitDisponivel.idAtendimento === eventoKit.idAtendimento
          || eventoKitDisponivel.idAtendimentoKit === eventoKit.idAtendimento
        );       
    
        // Atualiza as propriedades do eventoKit com base em eventoPublicadoKit
        if (eventoPublicadoKit) {
          eventoKit.disponivel = eventoPublicadoKit.disponivel;
          eventoKit.exclusivoPJ = eventoPublicadoKit.exclusivoPJ;
          eventoKit.destaque = eventoPublicadoKit.destaque;
          eventoKit.ordenacao = eventoPublicadoKit.ordenacao;
          eventoKit.divulgarMarketing = eventoPublicadoKit.divulgarMarketing;
          eventoKit.nomeCampanha = ''                    
          eventoKit.imgCard = ''
          eventoKit.campanhaTag = ''
          eventoKit.campanhaCorTag = ''
        }
        else {
          eventoKit.disponivel = false;
          eventoKit.exclusivoPJ = false;
          eventoKit.destaque = false;
          eventoKit.ordenacao = 0;
          eventoKit.divulgarMarketing = false;
          eventoKit.nomeCampanha = ''          
          eventoKit.imgCard = ''
          eventoKit.campanhaTag = ''
          eventoKit.campanhaCorTag = ''
        }        
        
        eventoKit.consultoria = false;
    
        return eventoKit;
      }));    
    } 

      eventosKit = eventosKit.sort((a, b) => {
        if (a.ordenacao > 0 && b.ordenacao > 0) {
          return a.ordenacao - b.ordenacao;
        } else if (a.ordenacao > 0) {
          return -1;
        } else if (b.ordenacao > 0) {
          return 1;
        } else {
          return 0;
        }
      })
        .sort((a, b) => {
          if (a.disponivel && !b.disponivel) {
            return -1
          } else if (!a.disponivel && b.disponivel) {
            return 1
          } else {
            return 0
          }
        });
    
    return eventosKit;
  } catch (error) {
    envio.mensagemPadrao(error, res, 400)
    // throw error;
  }
}

exports.listarDisponiveisPersonalizacao = async (req, res) => {
  
  try {
    let eventos = await execucaoKit.listarKitsPersonalizados();
    let coletivos = await coletivo.listarColetivoPersonalizados();

    eventos = eventos.concat(coletivos).map(elem => {

      return {
        idKit: elem.IdKit || null,
        idProduto: elem.IdProduto || null,
        titulo: elem.Titulo,
        descricao: elem.Descricao,
        personalizar: {
          imageSmall: {
            nome: null,
            arquivo: null,
            imagem: elem.ImagemPequena
          },
          imageMedium: {
            nome: null,
            arquivo: null,
            imagem: elem.ImagemMedia
          },
          imageLarge: {
            nome: null,
            arquivo: null,
            imagem: elem.ImagemGrande
          }
        },
        video: elem.Video || null,
        situacaoVideo: elem.SituacaoVideo || null
      }

    })
      
    res.status(200).send(eventos);

  } catch (error) {
    envio.mensagemPadrao(error, res, 400, req);
    // throw error;
  }
};


exports.inserirPersonalizacao = async (req, res) => {
  
  try {

    const escritorio = await local.consultar(49);
    const destinoUpload = config.Arquivo.destino + escritorio.slug;  
    const upload = multer({ dest: destinoUpload});

  
    upload.fields([
      { name: 'imageSmallArquivo', maxCount: 1 },
      { name: 'imageMediumArquivo', maxCount: 1 },
      { name: 'imageLargeArquivo', maxCount: 1 }
    ]) (req, res, async (err) => {
      
      try {
        
        const idKit = req.body.idKit  != undefined ? parseInt(req.body.idKit) : null; 
        const idProduto = req.body.idProduto  != undefined ? parseInt(req.body.idProduto) : null; 
        let item = null;
        if(idProduto != null)
          item = await coletivo.consultaColetivoPersonalizado(idProduto);
        else
          item = await execucaoKit.consultaKitPersonalizado(idKit);
        
        let data = {
          idKit: idKit,
          idProduto: idProduto,
          imagemGrande: item.ImagemGrande || null,
          imagemMedia: item.ImagemMedia || null,
          imagemPequena: item.ImagemPequena || null,
          video: item.Video || null,
          situacaoVideo: item.SituacaoVideo || null
        }
    
    
        // Acessando os nomes dos arquivos
        for(let file in req.files){
          let imagem = `${idProduto != null ? 'produto' : 'kit'}-personalizado-${Math.round(Math.random() * 100)}.jpeg`;
          const imagemFinalPath = path.resolve(path.join(destinoUpload, imagem));
          // Processamento da imagem com sharp
          await sharp(req.files[file][0].path)
              .jpeg({ quality: 80 })
              .toFormat('jpeg')
              .toFile(imagemFinalPath);

          // Deleta o arquivo temporário após o processamento
          fs.unlinkSync(req.files[file][0].path);

          if(file == 'imageLargeArquivo'){
            data.imagemGrande = imagem;
            if(item.ImagemGrande != null && fs.existsSync(path.resolve(path.join(destinoUpload, item.ImagemGrande))))
              fs.unlinkSync(path.resolve(path.join(destinoUpload, item.ImagemGrande)));
          } else if(file == 'imageMediumArquivo'){
            data.imagemMedia = imagem;
            if(item.imagemMedia != null && fs.existsSync(path.resolve(path.join(destinoUpload, item.ImagemMedia))))
              fs.unlinkSync(path.resolve(path.join(destinoUpload, item.ImagemMedia)));
          } else if(file == 'imageSmallArquivo'){
            data.imagemPequena = imagem;
            if(item.ImagemPequena != null && fs.existsSync(path.resolve(path.join(destinoUpload, item.ImagemPequena))))
              fs.unlinkSync(path.resolve(path.join(destinoUpload, item.ImagemPequena)));
          }
        }

        if(idProduto != null){
          if(item.ImagemGrande != null || item.imagemMedia != null || item.ImagemPequena != null)
            await coletivo.alterarColetivoPersonalizado(data.idProduto, data.imagemGrande, data.imagemMedia, data.imagemPequena, data.video, data.situacaoVideo);  
          else
            await coletivo.inserirColetivoPersonalizado(data.idProduto, data.imagemGrande, data.imagemMedia, data.imagemPequena, data.video, data.situacaoVideo);  
        }else{
          if(item.ImagemGrande != null || item.imagemMedia != null || item.ImagemPequena != null)
            await execucaoKit.alterarKitPersonalizado(data.idKit, data.imagemGrande, data.imagemMedia, data.imagemPequena, data.video, data.situacaoVideo);  
          else
            await execucaoKit.inserirKitPersonalizado(data.idKit, data.imagemGrande, data.imagemMedia, data.imagemPequena, data.video, data.situacaoVideo);  

        }

      } catch(e){
        console.log(e)
      }
    });
      
    res.status(200).send(null);

  } catch (error) {
    envio.mensagemPadrao(error, res, 400, req);
    // throw error;
  }
};


exports.consultarKitPersonalizacao = async (req, res) => {
  try {
    const idKit = req.params.idKit !== undefined ? parseInt(req.params.idKit) : null;

    let evento = await execucaoKit.consultaKitPersonalizado(idKit);
    let faqKit = await execucaoKit.consultarFaqPorIdKit(idKit);

    if (evento != null) {
      evento = {
        idKit: evento.IdKit || null,
        titulo: evento.Titulo,
        descricao: evento.Descricao,
        personalizar: {
          imageSmall: {
            nome: null,
            arquivo: null,
            imagem: evento.ImagemPequena
          },
          imageMedium: {
            nome: null,
            arquivo: null,
            imagem: evento.ImagemMedia
          },
          imageLarge: {
            nome: null,
            arquivo: null,
            imagem: evento.ImagemGrande
          }
        },
        video: evento.Video || null,
        situacaoVideo: evento.SituacaoVideo || null,
        faq: []
      };

      // Se faqKit for nulo ou indefinido, define como um array vazio
      let faqArray = faqKit ? faqKit.slice(0, 5) : [];

      // Transforma cada item do faqKit
      faqArray = faqArray.map(faq => ({
        id: faq.idFaqKit || null,
        pergunta: faq.pergunta || "",
        resposta: faq.resposta || "",
        ordenacao: faq.ordenacao || ""
      }));

      if (faqArray.length < 5) {
        // Completa o array para garantir que tenha sempre 5 registros
        while (faqArray.length < 5) {
          faqArray.push({
            id: null,
            pergunta: "",
            resposta: "",
            ordenacao: ""
          });
        }  
      }

      // Atribui o array ajustado ao evento
      evento.faq = faqArray;

      return res.status(200).send(evento);
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Código do kit não foi encontrado.",
        tecnicalError: "Sem registros."
      });
    }
  } catch (error) {
    envio.mensagemPadrao(error, res, 400, req);
    // throw error;
  }
};


exports.consultarColetivoPersonalizacao = async (req, res) => {
  
  try {
    const idProduto = req.params.idProduto  != undefined ? parseInt(req.params.idProduto) : null; 

    let evento = await coletivo.consultaColetivoPersonalizado(idProduto); 
    let faqProduto = await coletivo.consultarFaqPorIdProduto(idProduto)

    if(evento != null){
      evento = {
        idProduto: evento.IdProduto || null,
        titulo: evento.Titulo,
        descricao: evento.Descricao,
        personalizar: {
          imageSmall: {
            nome: null,
            arquivo: null,
            imagem: evento.ImagemPequena
          },
          imageMedium: {
            nome: null,
            arquivo: null,
            imagem: evento.ImagemMedia
          },
          imageLarge: {
            nome: null,
            arquivo: null,
            imagem: evento.ImagemGrande
          }
        },
        video: evento.Video || null,
        situacaoVideo: evento.SituacaoVideo || null,
        faq: []
      }

      // Se faqProduto for nulo ou indefinido, define como um array vazio
      let faqArray = faqProduto ? faqProduto.slice(0, 5) : [];

      // Transforma cada item do faqProduto
      faqArray = faqArray.map(faq => ({
        id: faq.idFaqProduto || null,
        pergunta: faq.pergunta || "",
        resposta: faq.resposta || "",
        ordenacao: faq.ordenacao || ""
      }));

      if (faqArray.length < 5) {
        while (faqArray.length < 5) {
          faqArray.push({
            id: null,
            pergunta: "",
            resposta: "",
            ordenacao: ""
          });
        }        
      }
      // Completa o array para garantir que tenha sempre 5 registros

      // Atribui o array ajustado ao evento
      evento.faq = faqArray;
      
      res.status(200).send(evento);

    }else{
      res.status(400).json({ statusCode: 400, message: "Código do produto não foi encontrado." , tecnicalError: "Sem registros." });
    }

  } catch (error) {
    envio.mensagemPadrao(error, res, 400, req);
    // throw error;
  }
};

exports.excluirColetivoPersonalizacao = async (req, res) => {
  
  try {
    const idProduto = req.params.idProduto  != undefined ? parseInt(req.params.idProduto) : null; 
    let evento = await coletivo.consultaColetivoPersonalizado(idProduto);   
    if(evento != null){  
      const escritorio = await local.consultar(49);
      const destinoUpload = config.Arquivo.destino + escritorio.slug;  

      if(evento.ImagemGrande != null && fs.existsSync(path.resolve(path.join(destinoUpload, evento.ImagemGrande))))
        fs.unlinkSync(path.resolve(path.join(destinoUpload, evento.ImagemGrande)));

      if(evento.ImagemMedia != null && fs.existsSync(path.resolve(path.join(destinoUpload, evento.ImagemMedia))))
        fs.unlinkSync(path.resolve(path.join(destinoUpload, evento.ImagemMedia)));

      if(evento.ImagemPequena != null && fs.existsSync(path.resolve(path.join(destinoUpload, evento.ImagemPequena))))
        fs.unlinkSync(path.resolve(path.join(destinoUpload, evento.ImagemPequena)));

      if(evento.Video != null){
        await coletivo.alterarColetivoPersonalizado(idKit, null, null, null, evento.Video, evento.SituacaoVideo);  
      }else{
        await coletivo.excluirColetivoPersonalizado(idKit);
      }
    }

    res.status(200).send(evento);
  
  } catch (error) {
    envio.mensagemPadrao(error, res, 400, req);
    // throw error;
  }
};

exports.excluirKitPersonalizacao = async (req, res) => {
  
  try {
    const idKit = req.params.idKit  != undefined ? parseInt(req.params.idKit) : null; 
    let evento = await execucaoKit.consultaKitPersonalizado(idKit);        

    if(evento != null){  
      const escritorio = await local.consultar(49);
      const destinoUpload = config.Arquivo.destino + escritorio.slug;  

      if(evento.ImagemGrande != null && fs.existsSync(path.resolve(path.join(destinoUpload, evento.ImagemGrande))))
        fs.unlinkSync(path.resolve(path.join(destinoUpload, evento.ImagemGrande)));

      if(evento.ImagemMedia != null && fs.existsSync(path.resolve(path.join(destinoUpload, evento.ImagemMedia))))
        fs.unlinkSync(path.resolve(path.join(destinoUpload, evento.ImagemMedia)));

      if(evento.ImagemPequena != null && fs.existsSync(path.resolve(path.join(destinoUpload, evento.ImagemPequena))))
        fs.unlinkSync(path.resolve(path.join(destinoUpload, evento.ImagemPequena)));

      if(evento.Video != null){
        await execucaoKit.alterarKitPersonalizado(idKit, null, null, null, evento.Video, evento.SituacaoVideo);  
      }else{
        await execucaoKit.excluirKitPersonalizado(idKit);
      }
    }

    res.status(200).send(evento);

  } catch (error) {
    envio.mensagemPadrao(error, res, 400, req);
    // throw error;
  }
};


exports.cadastrarFaq = async (req, res) => {
  try { 
      
    let faq;

      if (req.body.idProduto) {
          faq = await coletivo.cadastrarFaqProduto(req.body)            
      }
      else {
          faq = await execucaoKit.cadastrarFaqKit(req.body)            
      }

    if (faq) {
      const successMessage = 'Sua solicitação foi processada com sucesso.';
      res.status(200).json({ status: 200, message: successMessage });
    }
    else {
      const errorMessage = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.';      
      res.status(400).json({ statusCode: 400, message: errorMessage});
    }    
      
  } catch (e) {
      envio.mensagemPadrao(e, res, 400)
  }
}

exports.excluirFaq = async (req, res) => { 
  try {
    let faq;

    if (req.body.idProduto) {
      faq = await coletivo.excluirFaqProdutoPorIdProduto(req.body.idProduto)            
    }
    else {
        faq = await execucaoKit.excluirFaqKitPorIdKit(req.body.idKit)            
    }

    if (faq) {
      const successMessage = 'Sua solicitação foi processada com sucesso.';
      res.status(200).json({ status: 200, message: successMessage });
    }
    else {
      const errorMessage = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.';      
      res.status(400).json({ statusCode: 400, message: errorMessage});
    }  
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)
  }
}

let listarFaq = async (evento) => {
  try {
    let faq = [];
    if (evento) {
      if (!evento.idAtendimentoKit) {
        // Produto
        faq = await coletivo.consultarFaqPorIdProduto(evento.idProduto)
      }
      else {
        // Kit
        faq = await execucaoKit.consultarFaqPorIdKit(evento.idProduto) // o idProduto é o idKit
      }
    }
      return faq;
  } catch (error) {
     envio.mensagemPadrao(error, res, 400)
    // throw error;
  }
}

exports.listarOnlineDisponiveis = async (req, res) => {
  try {  
    let eventos = [];
    eventos = await listarDisponiveisPorLocal(req.params.idLocal);
    const dataAtual = new Date();

    eventos = eventos.filter((evento) => {      
      return evento.modalidade === "Online" && evento.consultoria === false;});

    eventos = eventos.filter((evento) => {
      const dataInicioEvento = new Date(evento.agenda[evento.agenda.length-1].dataInicio);
      return dataInicioEvento >= dataAtual;
    });
     
    if (eventos)
      return eventos;
    else
      return null;
  } catch (e) {
    envio.mensagemPadrao(e, res, 400)
  }
}


exports.inserirVideo = async (req, res) => {
  
  try {
        
      const idKit = req.body.idKit  != undefined ? parseInt(req.body.idKit) : null; 
      const idProduto = req.body.idProduto  != undefined ? parseInt(req.body.idProduto) : null; 
      const urlVideo = req.body.urlVideo  != undefined ? req.body.urlVideo : null; 
      const situacaoVideo = req.body.situacaoVideo  != undefined ? req.body.situacaoVideo : 1; 

      let item = null;
      if(idProduto != null)
        item = await coletivo.consultaColetivoPersonalizado(idProduto);
      else
        item = await execucaoKit.consultaKitPersonalizado(idKit);
      
      let data = {
        idKit: idKit,
        idProduto: idProduto,
        imagemGrande: item.ImagemGrande || null,
        imagemMedia: item.ImagemMedia || null,
        imagemPequena: item.ImagemPequena || null,
        video: item.Video || null,
        situacaoVideo: item.SituacaoVideo || null
      }
      
      if(idProduto != null){
        if(data.imagemGrande != null || data.imagemMedia != null || data.imagemPequena != null || data.video != null)
          await coletivo.alterarColetivoPersonalizado(data.idProduto, data.imagemGrande, data.imagemMedia, data.imagemPequena, urlVideo, situacaoVideo);  
        else
          await coletivo.inserirColetivoPersonalizado(data.idProduto, data.imagemGrande, data.imagemMedia, data.imagemPequena, urlVideo, situacaoVideo);  
      }else{
        if(data.imagemGrande != null || data.imagemMedia != null || data.imagemPequena != null || data.video != null)
          await execucaoKit.alterarKitPersonalizado(data.idKit, data.imagemGrande, data.imagemMedia, data.imagemPequena, urlVideo, situacaoVideo);  
        else
          await execucaoKit.inserirKitPersonalizado(data.idKit, data.imagemGrande, data.imagemMedia, data.imagemPequena, urlVideo, situacaoVideo);  

      }
      
    res.status(200).send(null);

  } catch (error) {
    envio.mensagemPadrao(error, res, 400, req);
    // throw error;
  }
};

exports.excluirKitVideo = async (req, res) => {
  
  try {
    const idKit = req.params.idKit  != undefined ? parseInt(req.params.idKit) : null; 
    let data = await execucaoKit.consultaKitPersonalizado(idKit);        

    if(data != null){  
      if(data.ImagemGrande != null || data.ImagemMedia != null || data.ImagemPequena != null){
        await execucaoKit.alterarKitPersonalizado(idKit, data.ImagemGrande, data.ImagemMedia, data.ImagemPequena, null, null);  
      }else{
        await execucaoKit.excluirKitPersonalizado(idKit);
      }
    }

    res.status(200).send(data);

  } catch (error) {
    envio.mensagemPadrao(error, res, 400, req);
    // throw error;
  }
};

exports.excluirProdutoVideo = async (req, res) => {
  
  try {
    const idProduto = req.params.idProduto  != undefined ? parseInt(req.params.idProduto ) : null; 
    let data = await coletivo.consultaColetivoPersonalizado(idProduto);   

    if(data != null){  
      if(data.ImagemGrande != null || data.ImagemMedia != null || data.ImagemPequena != null){
        await coletivo.alterarColetivoPersonalizado(idProduto, data.ImagemGrande, data.ImagemMedia, data.ImagemPequena, null, 1);  
      }else{
        await coletivo.excluirColetivoPersonalizado(idProduto);
      }
    }

    res.status(200).send(data);

  } catch (error) {
    envio.mensagemPadrao(error, res, 400, req);
    // throw error;
  }
};

//Lista somente disponíveis
let listarDisponiveisPorLocalSemConsultoria = async (idLocal, idAtendimento) => {
  try {
    
    let eventos =[];
    eventos = await listarPorLocal(idLocal, true);
    if (eventos.length) eventos = eventos.filter(evento => (evento.disponivel == true && (idAtendimento != null? evento.idAtendimento === idAtendimento : true)));
    return eventos;

  } catch (error) {
     envio.mensagemPadrao(error, res, 400)
    // throw error;
  }
}