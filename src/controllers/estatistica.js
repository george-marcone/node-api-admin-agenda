'use strict'
const estatisticas = require('../dominio/estatisticas');
const envio = require('../services/custom-messages');

exports.listar = async (req , res) => {
      try {
        var acessos = await estatisticas.listar(req.params.idLocal);          
          if (acessos)
            res.status(200).send(acessos)
          else
              throw "Não foram encontrado acessos para este escritórios"                        
    }
      catch (e) {
          envio.mensagemPadrao(e, res, 400)         
    }
}

exports.listarTodos = async (req , res) => {
  try {
    var acessos = await estatisticas.listarTodos(req.params.mes, req.params.ano);          
      if (acessos)
        res.status(200).send(acessos)
      else
          throw "Não foram encontrado acessos para este escritórios"                        
  }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)         
  }
}


exports.banner = async (req , res) => {
  try {
    var banners = await estatisticas.banner();          
      if (banners)
        res.status(200).send(banners)
      else
          throw "Não foram encontrados banners"                        
  }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)         
  }
}


exports.bannerLocalPublicados = async (req , res) => {
  try {
    var locais = await estatisticas.bannerLocalPublicados();          
      if (locais)
        res.status(200).send(locais)
      else
          throw "Não foram encontrados locais com banners não publicados"                        
  }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)         
  }
}

exports.consultoria = async (req , res) => {
  try {
    var consultorias = await estatisticas.consultoria();          
      if (consultorias)
        res.status(200).send(consultorias)
      else
          throw "Não foram encontradas consultorias"                        
  }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)         
  }
}


exports.consultoriaLocalPublicadas = async (req , res) => {
  try {
    var locais = await estatisticas.consultoriaLocalPublicados();          
      if (locais)
        res.status(200).send(locais)
      else
          throw "Não foram encontrados locais com consultorias não publicadas"                        
  }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)         
  }
}

exports.cursos = async (req , res) => {
  try {
    var cursos = await estatisticas.cursos();          
      if (cursos)
        res.status(200).send(cursos)
      else
          throw "Não foram encontradas cursos"                        
  }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)         
  }
}


exports.cursosLocalPublicados = async (req , res) => {
  try {
    var locais = await estatisticas.cursosLocalPublicados();          
      if (locais)
        res.status(200).send(locais)
      else
          throw "Não foram encontrados locais com cursos não publicados"                        
  }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)         
  }
}

exports.download = async (req , res) => {
  try {
    var cursos = await estatisticas.download();          
      if (cursos)
        res.status(200).send(cursos)
      else
          throw "Não foram encontradas downloads"                        
  }
    catch (e) {
        envio.mensagemPadrao(e, res, 400)         
  }
}
