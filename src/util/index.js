'use strict'
const moment = require("moment");

exports.formatData = (data) => {
    var month = '' + (data.getMonth() + 1);
    var day = '' + data.getDate();
    const year = data.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

exports.validarFormatoData = (dateString) => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false;
    return d.toISOString().slice(0, 10) === dateString;
}

//Soma a quantidade de dias na data. Formato de entrada = YYYY-MM-DD
exports.somarData = (data, dias) => {
    var date = new Date(data + 'T00:00:00');
    date.setDate(date.getDate() + dias);
    return this.formatData(date);
}

exports.validarCPF = (cpf) => {
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
}

exports.validarCNPJ = (cnpj) => {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

exports.somenteNumeros = (array) => {
    return array.every(element => {
        return typeof element === 'number';
    });
}

exports.validarEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

exports.validarTelefone = (telefone) => {
    return telefone.match(/^(\d{10})$/);
}

exports.validarCEP = (CEP) => {
    return CEP.match(/^(\d{8})$/);
}

exports.validarCelular = (celular) => {
    return celular.match(/^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/);
}

exports.validarURL = (string) => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

exports.validarHorario = (horario) => {
    return horario.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/);
}

exports.transformarPropriedadesEmMinusculas = (objeto) => {
    const novoObjeto = {};
  
    for (let propriedade in objeto) {
      if (objeto.hasOwnProperty(propriedade)) {
        let novoNome = propriedade;
        // Substituir as propriedades desejadas
        if (propriedade === 'InformacoesAdicionais' || propriedade === 'maisInformacoes') {
          novoNome = novoNome.replace('InformacoesAdicionais', 'maisInformacoes').replace('informacoesAdicionais', 'maisInformacoes');
        }
        if (propriedade === 'DescrComplementoTitulo' || propriedade === 'complementoTitulo') {
          novoNome = novoNome.replace('DescrComplementoTitulo', 'complementoTitulo').replace('descrComplementoTitulo', 'complementoTitulo');
        }
  
        // Convertendo para minúsculas
        novoNome = novoNome.charAt(0).toLowerCase() + novoNome.slice(1);
        novoObjeto[novoNome] = objeto[propriedade];
      }
    }
  
    return novoObjeto;
  };