'use strict'
const local = require('../dominio/local');
const estatisticas = require('../dominio/estatisticas');
const email = require('../services/email');
const moment = require('moment')
moment.locale('pt')

exports.sendEmail = async () => {

    let locais = await local.listarERs();
    let date = moment()
    let month = date.format('MMMM');

    locais.forEach(async element => {
        if(element.emailAlerta != null){
            let acessos = await estatisticas.consultar(element.idLocal, date.month() + 1, date.year())
            if(acessos.length > 0){
                email.emailMensal(
                    {
                        to: element.emailAlerta,
                        subject: "Relatório mensal da Agenda"
                    },
                    acessos[0].visualizacoes,
                    acessos[0].usuarios,
                    month,
                    element.descricao,
                    element.slug
                )
            }

        }
    });
    
}