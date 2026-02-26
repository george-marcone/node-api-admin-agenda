'use strict'
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const banner = require('../dominio/banner');
const local = require("../dominio/local");
const envio = require('../services/custom-messages');
const sharp = require('sharp');


exports.listar = async (req , res) => {
      try {
        var banners = await banner.listar(req.params.idLocal);          
          if (banners)
            res.status(200).send(banners)
          else
              throw "Não foram encontrado banners para este escritórios"                        
    }
      catch (e) {
          envio.mensagemPadrao(e, res, 400)         
    }
}

exports.cadastrar = async (req, res) => {
  try {
    const escritorio = await local.consultar(parseInt(req.params.idLocal));
    if(!escritorio || !escritorio.slug) throw "Não encontrado Escritório Regional para o parâmentro enviado"
    const destinoUpload = config.Arquivo.destino + escritorio.slug;  
    const upload = multer({ 
        dest: destinoUpload,
        limits: {
          fieldSize: 5 * 1024 * 1024, // Limite para campos de texto (ex: campo "result")
          fileSize: 10 * 1024 * 1024  // Limite para arquivos (ex: imagens)
        }
      });
      
    // Realização do upload do arquivo recebido do front

    upload.single('arquivo')(req, res, async (err) => {
        if (err) {
            console.log(formData.get('result'));
            envio.mensagemPadrao(err, res, 500)            
        }
        else {            

                try {
                    let item = {
                        idLocal: parseInt(req.params.idLocal),
                        titulo: req.body.titulo,
                        link: req.body.link,
                        situacao: req.body.publicado == 'true' ? 1:0,
                        dataInicio: req.body.dataInicio || null,
                        dataFim: req.body.dataFim || null
                };
                    // validar o tamanho do link
                    if ((item && !item.link) || item.link.length === 0) throw "O link é obrigatório";     
                    if (item && item.link && item.link.length > 255) throw "O tamanho do link excede 255 caracteres";

                    const retorno = await banner.incluir(item) ;
                    if (!retorno || !retorno.insertId) throw "Não foi possível atualizar a imagem do banner";      
                    
                    item.idBanner  = retorno.insertId;   
                    if (req.hasOwnProperty('file')) {

                    // Alterando o arquivo para o novo nome
                    if(req.file.originalname)
                        item.imagem = 'banner-' + `${item.idBanner}.jpeg`;    
                    else throw "A seleção do aquivo de imagem do banner é obrigatória";

                        await sharp(req.file.path)
                        .resize({
                            fit: sharp.fit.contain,
                            height: 480
                        })
                        .jpeg({ quality: 80 })
                        .toFormat('jpeg')
                        .toFile(
                            path.resolve(path.join(destinoUpload, item.imagem))
                        )
                        fs.unlinkSync(req.file.path)
                        
                        await banner.atualizar(item);
                        envio.mensagemPadrao(null, res, 201)                         
                    }
                    else throw "A seleção do aquivo de imagem do banner é obrigatória";                   

                } catch (error) {
                    envio.mensagemPadrao(error, res, 400)                     
                }    
            }
      });
  }
  catch (e) {
      envio.mensagemPadrao(e, res, 400)     
  }    
}

exports.atualizar = async (req, res) => {
    try {
  
      const escritorio = await local.consultar(parseInt(req.params.idLocal));
      if(!escritorio || !escritorio.slug) throw "Não encontrado Escritório Regional para o parâmentro enviado"
      const destinoUpload = config.Arquivo.destino + escritorio.slug; 

      const upload = multer({ 
        dest: destinoUpload,
        limits: {
          fieldSize: 5 * 1024 * 1024, // Limite para campos de texto (ex: campo "result")
          fileSize: 10 * 1024 * 1024  // Limite para arquivos (ex: imagens)
        }
      });
  
       upload.single('arquivo')(req, res, async err => {
           if (err)
                envio.mensagemPadrao(err, res, 500)                
            else {
               try {
                    if(!req.body.idBanner) throw "O idBanner é obrigatório"; 
                    let item = await banner.consultar(parseInt(req.body.idBanner));                     
                    if(req.hasOwnProperty('file'))
                    {
                        //Deleta o arquivo anterior
                        if(fs.existsSync(path.join(destinoUpload, item.imagem))) fs.unlinkSync( path.join(destinoUpload, item.imagem)); 
                        
                        // Alterando o arquivo para o novo nome
                        if(req.file.originalname)
                            item.imagem = 'banner-' + `${req.body.idBanner}.jpeg`;
                        else throw "A seleção do aquivo de imagem do banner é obrigatória";
                        
                        await sharp(req.file.path)
                        .resize({
                            fit: sharp.fit.contain,
                            height: 480
                        })
                        .jpeg({ quality: 80 })
                        .toFormat('jpeg')
                        .toFile(
                            path.resolve(path.join(destinoUpload, item.imagem))
                        )
                        fs.unlinkSync(req.file.path)

                   }
                //    else throw "A seleção do aquivo de imagem do banner é obrigatória";
                    
                    item.titulo = req.body.titulo;
                    item.link = req.body.link
                    item.dataInicio = req.body.dataInicio || null
                    item.dataFim = req.body.dataFim || null

                    // validar o tamanho do link
                    if ((item && !item.link) || item.link.length === 0) throw "O link é obrigatório";                    
                    if (item && item.link && item.link.length > 255) throw "O tamanho do link excede 255 caracteres";
                    
                    await banner.atualizar(item);                    
                    envio.mensagemPadrao(null, res, 203)   
                } catch (error) {                    
                    envio.mensagemPadrao(error, res, 400)   
                }                
            }
        });
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)       
    }    
  }

exports.excluir = async (req, res) => {
    try {
        const retorno = await banner.excluir(parseInt(req.params.idBanner));
        if (retorno) {
            let item = await banner.consultar(req.params.idBanner);
            if(!item) throw "Banner não foi encontrado";
            const escritorio = await local.consultar(parseInt(item.idLocal));
            if(!escritorio.slug) throw "Não encontrado Escritório Regional para o parâmentro enviado"
            const destinoUpload = config.Arquivo.destino + escritorio.slug; 
            if(fs.existsSync(path.join(destinoUpload, item.imagem))) fs.unlinkSync(path.join(destinoUpload, item.imagem)); 
        }
        envio.mensagemPadrao(null, res, 201)        
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)          
    }
}

exports.publicar = async (req, res) => {
    try {
        await banner.publicar(req.params.idBanner);         
        envio.mensagemPadrao(null, res, 203)        
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)             
    }
}

exports.priorizarBanners = async (req, res) => {
    try {
      const arrayOrdenacao = req.body.payload;
      let retorno;
  
      if (arrayOrdenacao) {
  
        for (let index = 0; index < arrayOrdenacao.length; index++) {
          const bannerObjeto = arrayOrdenacao[index];
          const bannerOrdenar = {
            Ordenacao: index + 1,
            IdBanner: bannerObjeto.idBanner,
            IdLocal: bannerObjeto.idLocal
          };
  
          retorno = await banner.priorizarBanner(bannerOrdenar);

        }
      }
  
      if (retorno) envio.mensagemPadrao(null, res, 203)
      else throw "Não foi possível realizar a priorização dos banners"
  
    } catch (e) {
      envio.mensagemPadrao(e, res, 400)
    }
  }
