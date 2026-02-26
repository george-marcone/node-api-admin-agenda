const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const logger = require('./logger');

exports.emailInteressado = async (email, interessado, consultoria, local) => {
  const filePath = path.join(__dirname, './templates/consultoria_interessado.html');
  
  let source = fs.readFileSync(filePath, 'utf-8').toString();

  source = source.replace(/{{ consultoria_name }}/g, consultoria.nome);
  source = source.replace(/{{ interessado_name }}/g, interessado.nome);
  
  if (interessado.motivo) {
    source = source.replace(/{{ interessado_motivo }}/g,
      "<br/>O interessado descreveu a seguinte necessidade para realizar a consultoria: <br/><b>" + interessado.motivo + "</b><br/><br/>");  
  }
  else {
    source = source.replace(/{{ interessado_motivo }}/g, "<br/>");
  }

  source = source.replace(/{{ link_interessados }}/g, `https://adminagenda.sebraesp.com.br/interessados/${local.slug}`);

  this.sendEmail(email, source)

}

exports.emailMensal = async (email, visualizacoes, usuarios, month, local, slug) => {
  const filePath = path.join(__dirname, './templates/mensal_email.html');
  
  let source = fs.readFileSync(filePath, 'utf-8').toString();

  source = source.replace(/{{ visualizacoes }}/g, visualizacoes);
  source = source.replace(/{{ usuarios }}/g, usuarios);
  source = source.replace(/{{ local }}/g, local);
  source = source.replace(/{{ month }}/g, month);
  source = source.replace(/{{ slug }}/g, slug);


  this.sendEmail(email, source)

}

exports.emailTeste = async (email) => {
  const filePath = path.join(__dirname, './templates/teste.html');
  
  let source = fs.readFileSync(filePath, 'utf-8').toString();
  this.sendEmail(email, source)

}


exports.sendEmail = async (email, body) => {

  try{

    const transporter = nodemailer.createTransport({
      host: "email.sebraesp.net.br",
      port: 25,
      secure: false
    });

    const mailOptions = {
      from: '"Agenda Sebrae SP" <noreply-agenda@sebraesp.net.br>',
      to: email.to,
      subject: email.subject,
      text: '',
      html: body
    };
    const info = await transporter.sendMail(mailOptions);
    if (config.Parametros.logAtivo) {
      logger.info(`"Message sent: ${info.accepted}"`);
      logger.info(`"Message sent: ${info.messageId}"`);
      logger.info(`"Message sent: ${info.rejected}"`);
      logger.info(`"Message sent: ${info.response}"`);
    }

  } catch (err) {
    if (config.Parametros.logAtivo) {
      logger.error(`"Error on email: ${err}"`);
    }
  }
  // console.log("Message sent: %s", info.messageId);

}