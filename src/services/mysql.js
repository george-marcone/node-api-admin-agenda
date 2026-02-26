const mysql = require("mysql-await");

exports.listar = async (query, banco, parametros) => {

  const connection = mysql.createConnection(banco);
  try {

    let req = [];

    if (parametros) for (var key of Object.keys(parametros)) req.push(parametros[key]);

    let result = await connection.awaitQuery(query, req);

    return result;

  } catch (error) {
    throw error;
  } finally {
    connection.awaitEnd();
  }
}

exports.alterar = async (query, banco, parametros) => {

  const connection = mysql.createConnection(banco);
  try {

    let req = [];

    if (parametros) for (var key of Object.keys(parametros)) req.push(parametros[key]);

    let result = await connection.awaitQuery(query, req);

    return result;

  } catch (error) {
    throw error;
  } finally {
    connection.awaitEnd();
  }
}

exports.incluir = async (query, banco, parametros) => {

  const connection = mysql.createConnection(banco);
  try {

    let req = [];

    if (parametros) for (var key of Object.keys(parametros)) req.push(parametros[key]);

    let result = await connection.awaitQuery(query, req);

    return result;

  } catch (error) {
    throw error;
  } finally {
    connection.awaitEnd();
  }
}

exports.consultar = async (query, banco, parametros) => {

  const connection = mysql.createConnection(banco);
  try {

    let req = [];

    if (parametros) for (var key of Object.keys(parametros)) req.push(parametros[key]);

    let result = await connection.awaitQuery(query, req);

    return result;

  } catch (error) {
    throw error;
  } finally {
    connection.awaitEnd();
  }
}