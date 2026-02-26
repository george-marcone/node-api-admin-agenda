'use strict'
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const campanha = require('../dominio/campanha');
const local = require("../dominio/local");
const envio = require('../services/custom-messages');
const sharp = require('sharp');
const validacao = require('../validacoes/campanha');


exports.listar = async (req , res) => {
      try {
        var campanhas = await campanha.listar(req.params.idLocal);          
          if (campanhas)
            res.status(200).send(campanhas)
          else
              throw "Não foram encontrado banners para este escritórios"                        
    }
      catch (e) {
          envio.mensagemPadrao(e, res, 400)         
    }
}

exports.criar = async (req, res) => {
  try {
    const escritorio = await local.consultar(parseInt(req.params.idLocal));
    if(!escritorio || !escritorio.slug) throw "Não encontrado Escritório Regional para o parâmentro enviado"
    let destinoUpload;
    if(process.env.NODE_ENV === 'dev'){
        destinoUpload = path.join(__dirname + '../../../', config.Arquivo.destino.replace('../', '') + escritorio.slug);  
    }else{
        destinoUpload = path.join(__dirname + '../../../bin/', config.Arquivo.destino.replace('../', '') + escritorio.slug);  
    }
    if (!fs.existsSync(destinoUpload)){
        fs.mkdirSync(destinoUpload);
    }
    const upload = multer({ dest: destinoUpload,  limits: { fileSize: 1000000 }});

    // Realização do upload do arquivo recebido do front

    upload.single('imgCard')(req, res, async (err) => {
        try {
            if (err){
                if(err.code === 'LIMIT_FILE_SIZE') throw "O limite para a imagem é de 1MB."
                envio.mensagemPadrao(err, res, 500)            
            }else {            


                
                validacao.validarCriacao(req, res);
                if(!req.file) throw "Campo 'imgCard' é obrigatório."

                let campanhas = await campanha.consultarPorKit(req.body.codigoDoKit);
                if(campanhas.length)  throw "Já existe uma campanha com este codigo de kit."


                let item = {
                    idLocal: parseInt(req.params.idLocal),
                    idExecucaoKit: req.body.codigoDoKit,
                    cor: req.body.cor,
                    nome: req.body.nome,
                    tag: req.body.tag,
                    situacao: req.body.ativar == 'true' ? 1 : 0
                };
            

                // Alterando o arquivo para o novo nome
                item.img = 'campanha-' + `${Math.floor(Math.random() * 1000)}.jpeg`; 

                await sharp(req.file.path)
                .resize({
                    fit: sharp.fit.contain,
                    height: 480
                })
                .jpeg({ quality: 80 })
                .toFormat('jpeg')
                .toFile(
                    path.resolve(path.join(destinoUpload, item.img))
                )
                fs.unlinkSync(req.file.path)
                
                await campanha.criar(item);

                envio.mensagemPadrao(null, res, 201)                                       

                  
            }
        } catch (error) {
            envio.mensagemPadrao(error, res, 400)                     
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
    let destinoUpload;
    if(process.env.NODE_ENV === 'dev'){
        destinoUpload = path.join(__dirname + '../../../', config.Arquivo.destino.replace('../', '') + escritorio.slug);  
    }else{
        destinoUpload = path.join(__dirname + '../../../bin/', config.Arquivo.destino.replace('../', '') + escritorio.slug);  
    }
    if (!fs.existsSync(destinoUpload)){
        fs.mkdirSync(destinoUpload);
    }

    const upload = multer({ dest: destinoUpload, limits: { fileSize: 1000000 }});

    upload.single('imgCard')(req, res, async err => {
        try {
            if (err){
                if(err.code === 'LIMIT_FILE_SIZE') throw "O limite para a imagem é de 1MB."
                envio.mensagemPadrao(err, res, 500)                
            }else {
            
                validacao.validarCriacao(req, res);

                
                if(!req.body.idCampanha) throw "O idCampanha é obrigatório"; 
                let item = await campanha.consultar(parseInt(req.body.idCampanha));  
                if(!item) throw "Campanha não encontrada"; 
                let campanhas = await campanha.consultarPorKit(req.body.codigoDoKit);
                if(campanhas.length && item.idCampanha != req.body.idCampanha)  throw "Já existe uma campanha com este codigo de kit.'"

                let campanhaObj = JSON.parse(JSON.stringify(item));

                let data = {
                    IdExecucaoKit: req.body.codigoDoKit,
                    Nome: req.body.nome,
                    Cor: req.body.cor,
                    Tag: req.body.tag,
                    Img: campanhaObj.imgCard,
                    Situacao: req.body.ativar == 'true' ? 1 : 0,
                    IdCampanha: req.body.idCampanha
                }


                if(req.hasOwnProperty('file'))
                {
                    //Deleta o arquivo anterior
                    if(fs.existsSync(path.join(destinoUpload, campanhaObj.imgCard))) fs.unlinkSync( path.join(destinoUpload, campanhaObj.imgCard)); 
                    
                    // Alterando o arquivo para o novo nome
                    if(req.file.originalname)
                        data.Img = 'campanha-' + `${Math.floor(Math.random() * 1000)}.jpeg`;
                    else throw "A seleção do aquivo de imagem do banner é obrigatória";
                    
                    await sharp(req.file.path)
                    .resize({
                        fit: sharp.fit.contain,
                        height: 480
                    })
                    .jpeg({ quality: 80 })
                    .toFormat('jpeg')
                    .toFile(
                        path.resolve(path.join(destinoUpload, data.Img))
                    )
                    fs.unlinkSync(req.file.path)

                }
                
  
                await campanha.atualizar(data);                    
                envio.mensagemPadrao(null, res, 203)   
                         
            }
        } catch (error) {                    
            envio.mensagemPadrao(error, res, 400)   
        }  
    });
}
catch (e) {
    envio.mensagemPadrao(e, res, 400)       
}    
}


exports.excluir = async (req, res) => {
    try {
        const retorno = await campanha.excluir(parseInt(req.params.idCampanha));
        if (retorno) {
            let item = await campanha.consultar(req.params.idCampanha);
            if(!item) throw "Campanha não foi encontrada";
            const escritorio = await local.consultar(parseInt(item.idLocal));
            if(!escritorio.slug) throw "Não encontrado Escritório Regional para o parâmentro enviado"
            let destinoUpload;
            if(process.env.NODE_ENV === 'dev'){
                destinoUpload = path.join(__dirname + '../../../', config.Arquivo.destino.replace('../', '') + escritorio.slug);  
            }else{
                destinoUpload = path.join(__dirname + '../../../bin/', config.Arquivo.destino.replace('../', '') + escritorio.slug);  
            }
            if(fs.existsSync(path.join(destinoUpload, item.imgCard))) fs.unlinkSync(path.join(destinoUpload, item.imgCard)); 
        }
        envio.mensagemPadrao(null, res, 201)        
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)          
    }
}

exports.publicar = async (req, res) => {
    try {
        await campanha.publicar(req.params.idCampanha);         
        envio.mensagemPadrao(null, res, 203)        
    }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)             
    }
}
