require('dotenv').config();

// SolucoesDigitais MYSQL

exports.SolucoesDigitaisMYSQL = {
    user: process.env.DB_SOLUCOESDIGITAIS_MYSQL_USER,
    password: process.env.DB_SOLUCOESDIGITAIS_MYSQL_PWD,
    host: process.env.DB_SOLUCOESDIGITAIS_MYSQL_SERVER,
    database: process.env.DB_SOLUCOESDIGITAIS_MYSQL_DATABASE,
    port: 3306,
    connectionLimit: 10,
    typeCast: function castField( field, useDefaultTypeCasting ) {
        if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
            var bytes = field.buffer();
            return( bytes[ 0 ] === 1 );
		}
		return( useDefaultTypeCasting() );
	}
}

exports.PaginaERDB = {
    user: process.env.DB_PAGINAER_USER,
    password: process.env.DB_PAGINAER_PWD,
    host: process.env.DB_PAGINAER_SERVER,
    database: process.env.DB_PAGINAER_DATABASE,
    typeCast: function castField( field, useDefaultTypeCasting ) {
        if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
            var bytes = field.buffer();
            return( bytes[ 0 ] === 1 );
		}
		return( useDefaultTypeCasting() );
	}
}

exports.Arquivo = {
    destino: process.env.ARQUIVO_DESTINO
}

exports.AMEI = {
    realm: process.env.AMEI_REALM,
    baseUrl: process.env.AMEI_URL,
    client: process.env.AMEI_CLIENT,
    habilitado: (process.env.AMEI_HABILITADO === "true"),
    realm_externo: process.env.AMEI_REALM_EXTERNO,
    baseUrlExterno: process.env.AMEI_URL_EXTERNO
}

exports.Parametros = {
    idCentralAtendimento: 38,
    limiteCentralAtendimento: 50,
    categoria: {
        presencial: "presencial",
        online: "online"        
    }, 
    logAtivo: true
}


