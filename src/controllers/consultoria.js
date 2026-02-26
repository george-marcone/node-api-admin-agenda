'use strict'
const consultoria = require('../dominio/consultoria');
const material = require('../dominio/material-apoio');
const envio = require('../services/custom-messages');
const amei = require('../services/amei');
const util = require('../util/index');
const validacaoAmei = require('../validacoes/amei')
const XlsxPopulate = require('xlsx-populate');
const { Readable } = require('stream');


let listarPorLocal = async (idLocal) => {
  try {

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
      item.consultoria = true;
      return item;
    }));

    // Remover duplicidades com base no ID da consultoria
    consultoriasList = consultoriasList.filter((item, index, self) =>
    index === self.findIndex(t => t.idProduto === item.idProduto));
 
    consultoriasList = consultoriasList.sort((a, b) => {
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
    
      // Aplicando filtro para retornar apenas registros online
      if (idLocal == 38) {      
        consultoriasList = consultoriasList.filter((consultoria) => {
        return consultoria.modalidade === 'Online';});
      } 

    return consultoriasList;
  } catch (error) {
    //envio.mensagemPadrao(error, res, 400)
     return error
  }
}

exports.listarPorIdLocal = async (req, res) => {
  try {
    let consultorias =[];
    consultorias = await listarPorLocal(req.params.idLocal);

    if (consultorias) 
      res.status(200).send(consultorias);
    else
      throw 'Não foram encontradas consultorias coletivos disponíveis'
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)    
  }
}

exports.listarDisponiveisPorLocal = async (req, res) => {
  try {
    
    let consultorias =[];
    consultorias = await listarPorLocal(req.params.idLocal);
    if (consultorias.length) consultorias = consultorias.filter(consultoria => (consultoria.disponivel == true));

    if (consultorias) 
      res.status(200).send(consultorias);
    else
      throw 'Não foram encontradas consultorias coletivos disponíveis'
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)    
  }
}

exports.disponibilizar = async (req, res) => {
  try {
    let resultado = await consultoria.consultar(req.body.idConsultoria);
    if (resultado.length)
      await consultoria.disponibilizar(req.body.idLocal, req.body.idConsultoria, req.body.exibirFormulario, req.body.divulgarMarketing);

      let informacoesAtualizadas = await atualizarInformacoesDisponiveis(req.body.idLocal, req.body.idConsultoria)
    
      envio.mensagemPadraoComObjeto(null, res, 203, informacoesAtualizadas) 
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)
  }
}

exports.disponibilizarEmLote = async (req, res) => {
  // Categorias: presencial - online
  try {
    let consultorias = await consultoria.listar(req.body.idLocal);
    for (let item of consultorias) {
      await consultoria.disponibilizar(req.body.idLocal, item.idProduto, req.body.disponivel);
    }
    envio.mensagemPadrao(null, res, 201)
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)
  }
}

exports.destaque = async (req, res) => {
  try {

    let resultado = await consultoria.consultar(req.body.idConsultoria);
    if (resultado.length)
      await consultoria.destaque(req.body.idLocal, req.body.idConsultoria, req.body.destaque == true ? 1 : 0);

    envio.mensagemPadrao(null, res, 201)
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)
  }
}

exports.ordenacao = async (req, res) => {
  try {

    const arrayOrdenacao = req.body.payload;
    let retorno;

    if (arrayOrdenacao) {
      for (let index = 0; index < arrayOrdenacao.length; index++) {
        const curso = arrayOrdenacao[index];
        retorno = await consultoria.ordenacao(curso.idLocal, curso.idConsultoria, index + 1);
      }
    }
    if (retorno) envio.mensagemPadrao(null, res, 203)
    else throw "Não foi possível realizar a priorização das consultorias"

  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)
  }
}

exports.listarInteressados = async (req, res) => {
  try {
    let interessados = await consultoria.listarInteressados(req.params.idLocal);
    if (interessados)
      res.status(200).send(interessados);
    else
      throw 'Não foram encontrados interessados disponíveis'
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)    
  }
}

exports.excluirInteressado = async (req, res) => {
  try {
      const retorno = await consultoria.excluirInteressado(parseInt(req.body.idInteracao), req.body.faraConsultoria);
    if (retorno) {
        envio.mensagemPadrao(null, res, 201)
      }
  }
  catch (e) {
      envio.mensagemPadrao(e, res, 400)          
  }
}

exports.cadastrarInteressado = async (req, res) => {
  try {
    let user = null
    if (req.body.hasOwnProperty('token'))
       user = await amei.obterDadosUsuario(req.body.token)
    
    if (user) {
      const interessado = {
          idLocal: req.body.idLocal,
          idProduto: req.body.idProduto,
          motivo: req.body.motivo,
          nome: user.name,
          telefone: user.telefoneCelular != null? user.telefoneCelular.toString().replace(/\D/g, '') : null,
          email: user.email
      };
      
      const dadosAmei = {
        nome: interessado.nome,
        telefone: interessado.telefone,
        email: interessado.email
      }

      const dadosValidados = validacaoAmei.validarDadosUsuarioInteressado(dadosAmei, res)
      
      if(!dadosValidados.ok)
        throw "Não foi possível realizar a  inscrição... " + dadosValidados.message + " no cadastro do AMEI.";

      const retorno = await consultoria.cadastrarInteressado(interessado);      

      if (retorno) {
        envio.mensagemPadrao(null, res, 201)  
        // Send email for admin
        await consultoria.enviarEmailInteressado(interessado);
      }        
      else throw "Não foi possível realizar a inscrição.";
    }
    else throw "Não foi possível realizar a  inscrição.";
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)
  }
}

exports.editarConsultoria = async (req, res) => {
  try {
    let retorno
    let idLocal = req.body.idLocal
    let idConsultoria = req.body.idProduto
    
    let resultado = await consultoria.consultar(idConsultoria);        

    if (resultado.length) {      
      let infoAdicionais = await consultoria.consultarMaisInfoConsultoria(idConsultoria, idLocal);
      
      if(infoAdicionais.length){ 
        retorno = await consultoria.editarMaisInfoConsultoria(idConsultoria, idLocal, req.body.maisInformacoes);
      } else {
        retorno = await consultoria.inserirMaisInfoConsultoria(idConsultoria, idLocal, req.body.maisInformacoes);
      }
    }
    
    // Editar a consultoria na tabela consultoria_disponivel
    if (req.body.hasOwnProperty('exibirFormulario')) {
      retorno = await consultoria.editarConsultoriaDisponivel(idConsultoria, idLocal, req.body.exibirFormulario);    
    }

    if (req.body.hasOwnProperty('divulgarMarketing')) {
      retorno = await consultoria.marketing(idLocal, idConsultoria, req.body.divulgarMarketing ? 1 : 0);    
    }
    
    let informacoesAtualizadas = await atualizarInformacoes(idLocal, idConsultoria)
    
    if (retorno) envio.mensagemPadraoComObjeto(null, res, 203, informacoesAtualizadas)        
    else throw "Não foi possível atualizar a consultoria"
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)
  }
}

exports.consultarMatApoioConsultoria = async (req, res) => {
  try {    
    let materialApoio = await material.consultarMatApoioConsultoria(req.params.idProduto);
    if (materialApoio && materialApoio.length > 0)
      res.status(200).send(materialApoio);
    else
      res.status(200).send({message:'Ebook não disponível', materialApoio: null});
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)    
  }
}

let atualizarInformacoes = async (idLocal, idConsultoria) => {
  try {
    
    // Retorna as informações atualizadas da consultoria publicada
    let consultoriaAtualizada = await consultoria.retornaConsultoriaEditada(idLocal, idConsultoria)
    
    if (consultoriaAtualizada && consultoriaAtualizada.length)
      consultoriaAtualizada = consultoriaAtualizada[0]

    // Retorna as informações adicionais atualizadas da consultoria publicada ou não
      let infoAdicionaisAtualizadas = await consultoria.consultarMaisInfoConsultoria(idConsultoria, idLocal);
      
    if (infoAdicionaisAtualizadas && infoAdicionaisAtualizadas.length) {
      infoAdicionaisAtualizadas = util.transformarPropriedadesEmMinusculas(infoAdicionaisAtualizadas[0])
    } 
    
    // merge dos dois objetos formados acima
      const informacoesAtualizadas = Object.assign({}, consultoriaAtualizada, infoAdicionaisAtualizadas);

    return informacoesAtualizadas;
  } catch (error) {    
     return error
  }
}

exports.marketing = async (req, res) => {
  try {
    let resultado = await consultoria.consultar(req.body.idProduto);
    if (resultado.length)
      await consultoria.marketing(req.body.idLocal, req.body.idProduto, req.body.divulgarMarketing ? 1 : 0);

    envio.mensagemPadrao(null, res, 201)
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)
  }
}

let atualizarInformacoesDisponiveis = async (idLocal, idConsultoria) => {
  try {
    
    // Retorna as informações atualizadas da consultoria publicada
    let consultoriaAtualizada = await consultoria.retornaConsultoriaEditada(idLocal, idConsultoria)
    
    if (consultoriaAtualizada && consultoriaAtualizada.length)
      consultoriaAtualizada = consultoriaAtualizada[0]
    
    // merge dos dois objetos formados acima
      const informacoesAtualizadas = consultoriaAtualizada

    return informacoesAtualizadas;
  } catch (error) {    
     return error
  }
}

exports.listarMarketingDivulgar = async (req, res) => {
  try {
    let resultMarketing = await consultoria.listarMarketingDivulgar();

    if (resultMarketing && resultMarketing.length > 0) {
      await gerarPlanilha(resultMarketing, res);
      // Não envie nenhuma resposta aqui
    } else {
      res.status(200).send({ message: 'Informações não disponíveis', data: null });
    }
  } catch (error) {
    envio.mensagemPadrao(error, res, 400);
  }
};

let gerarPlanilha = async (array, res) => {
  try {
    const workbook = await XlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);

    let headerRow = sheet.row(1);
    Object.keys(array[0]).forEach((column, index) => {
      headerRow.cell(index + 1).value(column);
    });

    // Aplicar estilo na primeira linha
    headerRow = sheet.range(`A1:${String.fromCharCode(65 + Object.keys(array[0]).length - 1)}1`);
    headerRow.style({
      bold: true // Negrito
    });

    array.forEach((obj, rowIndex) => {
      const row = sheet.row(rowIndex + 2);
      Object.values(obj).forEach((value, columnIndex) => {
        row.cell(columnIndex + 1).value(value);
      });
    });

    // Adicionar autofiltro
    const range = sheet.range(`A1:${String.fromCharCode(65 + Object.keys(array[0]).length - 1)}${array.length + 1}`);
    sheet.autoFilter(range);

    // Gerar o buffer
    const buffer = await workbook.outputAsync();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    const filename = `agenda-er-${formattedDate}.xlsx`;

    // Configurar a resposta HTTP
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Enviar o conteúdo do buffer como resposta
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    stream.pipe(res);
  } catch (e) {
    envio.mensagemPadrao(e, res, 400);
  }
};

exports.listarDisponiveisLocal = async (req, res) => {
  try {
    
    let consultorias =[];
    consultorias = await listarPorLocal(req.params.idLocal);
    if (consultorias.length) consultorias = consultorias.filter(consultoria => (consultoria.disponivel == true));

    if (consultorias) 
      return consultorias;
    else
      return null
  }
  catch (e) {
    envio.mensagemPadrao(e, res, 400)    
  }
}