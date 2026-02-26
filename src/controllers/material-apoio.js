'use strict'
const material = require('../dominio/material-apoio');
const envio = require('../services/custom-messages');
const amei = require('../services/amei');
const validacaoAmei = require('../validacoes/amei')
const axios = require('axios');
const logger = require('../services/logger');

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


exports.registrarDownload = async (req, res, next) => {
  try {
    let user = null;
    if (req.body.hasOwnProperty('token'))
      user = await amei.obterDadosUsuario(req.body.token);
    
    if (user) {
      const registro = {
        idLocal: req.body.idLocal,
        idProduto: req.body.idProduto || null,
        idConteudoApoio: req.body.idConteudoApoio,
        cpf: user.upn || user.preferred_username || (user.cpf != null ? user.cpf.toString().replace(".", "").replace("-", "") : null)
      };

      if (!validacaoAmei.validarUsuarioDownloadEbook({ cpf: registro.cpf }, res))
        throw "CPF inválido ou não informado no cadastro do AMEI.";

      // const arquivo = await gerarArquivoPDF(req.body.idConteudoApoio);
      
      let ebookBaixado = await material.consultarDownloadEbook(registro.cpf, registro.idConteudoApoio);
      if (ebookBaixado && ebookBaixado.length > 0) {
        res.send('ebook'+req.body.idConteudoApoio);
      } else { 
        const retorno = await material.registrarDownload(registro);
        
        if (retorno) {
          res.status(201).send('ebook'+req.body.idConteudoApoio);
        } else {
          throw "Não foi possível realizar o registro do download do conteúdo de apoio.";
        }
      }
    } else {
      throw "Não foi possível realizar o registro do download do conteúdo de apoio.";
    }
  } catch (e) {
    envio.mensagemPadrao(e, res, 400);
  }
};

// Obtém os arquivos direto do servidor de aplicação, do diretório Ebooks
// const fs = require('fs');
// const path = require('path');

// let gerarArquivoPDF = async (idConteudoApoio) => {
//   try {
//     let ebook = await material.consultarEbookPorIdProduto(idConteudoApoio);

//     if (ebook && ebook.length > 0) {
//       // Obter o caminho da raiz do projeto      
//       // Montar o caminho da pasta 'public/ebooks'
//       const ebookPath = path.resolve(path.join('public', 'ebooks'));
//       logger.info("info: local ebook - " + ebookPath);
//       const files = await fs.promises.readdir(ebookPath);

//       for (const file of files) {
//         if (file.includes(idConteudoApoio.toString())) {
//           const filePath = path.join(ebookPath, file);
//           const fileBuffer = await fs.promises.readFile(filePath);
//           return fileBuffer;
//         }
//       }

//       return null;
//     } else {
//       throw new Error('Ebook não encontrado');
//     }
//   } catch (error) {
//     logger.error("Error: " + error || error.stack);
//     throw new Error('Erro ao baixar o ebook: ' + error.message);
//   }
// };

// Obtém o arquivo do servidor de arquivos do Sebrae
// let gerarArquivoPDF = async (idConteudoApoio) => {
//   try {
//     let ebook = await material.consultarEbookPorIdProduto(idConteudoApoio);

//     if (ebook && ebook.length > 0) {
//       const url = ebook[0].linkDownload;
//       const response = await axios.get(url, { responseType: 'arraybuffer' });

//       return response.data;
//     } else {
//       throw new Error('Ebook não encontrado');
//     }
//   } catch (error) {
//     logger.error("Error: " + error || error.stack);
//     throw new Error('Erro ao baixar o ebook: ' + error.message);
//   }
// };

exports.listarEbooksDisponiveis = async (req, res) => {
  try {
    let materialApoio = await material.listarEbooksDisponiveis();
    if (materialApoio && materialApoio.length > 0)
      res.send(materialApoio);
    else
      res.send({ message: 'Ebooks não disponíveis', materialApoio: null });
  } catch (error) {
    envio.mensagemPadrao(e, res, 400)
  }
};

exports.consultarEbookPorIdProduto = async (req, res) => {
  try {
    let ebook = await material.consultarEbookPorIdProduto(req.params.idConteudoApoio);
    if (ebook && ebook.length > 0)
      res.send(ebook[0])     
    else
      res.send({message:'Ebook não disponível', data: null});
  } catch (error) {
    envio.mensagemPadrao(e, res, 400)
  }
}