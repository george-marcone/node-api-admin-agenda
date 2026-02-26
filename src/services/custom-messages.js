'use strict';
const logger = require('./logger');

exports.mensagemPadrao = async (err, res, statusCode = 200, req = null) => {
  if (err) {
    // Mensagem de erro para o usuário
    const errorMessage = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.';
    if(req != null){
      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      logger.error("Error on: " + fullUrl + " - Message: " + err || err.stack);
    }else{
      logger.error("Error: " + err || err.stack);
    }
    res.status(statusCode).json({ statusCode: statusCode, message: errorMessage , tecnicalError: err || err.stack });
  } else {
    // Mensagem de sucesso para o usuário
    const successMessage = 'Sua solicitação foi processada com sucesso.';
    res.status(statusCode).json({ statusCode: statusCode, message: successMessage });
  }
};

exports.mensagemPadraoComObjeto = async (err, res, statusCode = 200, data = {}) => {
  if (err) {
    // Tratamento de erro técnico
    console.error(err);

    // Mensagem de erro para o usuário
    const errorMessage = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.';
    logger.error("Error: " + err || err.stack);
    res.status(statusCode).json({ statusCode: statusCode, message: errorMessage, technicalError: err || err.stack, data });
  } else {
    // Mensagem de sucesso para o usuário
    const successMessage = 'Sua solicitação foi processada com sucesso.';
    res.status(statusCode).json({ statusCode: statusCode, message: successMessage, data });
  }
};