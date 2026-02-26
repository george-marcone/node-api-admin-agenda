'use strict';
const express = require('express');
const router = express.Router();
const local = require('../controllers/local');
const validacao = require('../validacoes/local');
const auth = require('../services/auth');

/**
 * @swagger
 * tags:
 *   name: Local
 *   description: Endpoints relacionados a Local
 */

/**
 * @ swagger
 * /local/cep/pesquisar:
 *   get:
 *     summary: Pesquisar um idLocal (Código do Escritório Regional) por CEP
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint Pesquisa um idLocal (Código do Escritório Regional) por CEP
 *     tags: [Local]
 *     parameters:
 *       - in: query
 *         name: cep
 *         schema:
 *           type: string
 *         description: Pesquisa por CEP
 *     responses:
 *       200:
 *         description: Local (Escritório Regional) encontrado com sucesso
 *       404:
 *         description: Nenhum local (Escritório Regional) encontrado para o CEP fornecido
 */
// router.get('/cep/pesquisar', local.pesquisar);

/**
 * @swagger
 * /local/listar:
 *   get:
 *     summary: Listar todos os locais (Escritórios Regionais)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO e Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint Lista todos os locais (Escritórios Regionais)
 *     tags: [Local]
 *     responses:
 *       200:
 *         description: Lista de locais (Escritórios Regionais) retornada com sucesso
 */
router.get('/listar', local.listar);

/**
 * @swagger
 * /local/cep/pesquisar/{cep}:
 *   get:
 *     summary: Pesquisar um idLocal (Código do Escritório Regional) por CEP
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint Pesquisa um idLocal (Código do Escritório Regional) por CEP
 *     tags: [Local]
 *     parameters:
 *       - in: path
 *         name: cep
 *         schema:
 *           type: integer
 *           maxLength: 8
 *         description: Pesquisa por CEP (máximo de 8 caracteres)
 *         required: true
 *     responses:
 *       200:
 *         description: idLocal (Escritório Regional) encontrado com sucesso
 *       404:
 *         description: Nenhum idlocal (Escritório Regional) encontrado para o CEP fornecido
 */
 router.get('/cep/pesquisar/:cep', validacao.validarCEP, local.pesquisar);

/**
 * @swagger
 * /local/listar/{idLocal}:
 *   get:
 *     summary: Listar todos os postos SEBRAE AQUI vinculados ao Código do Escritótio Regional informado
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO e Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint Lista todos os postos SEBRAE AQUI vinculados ao Código do Escritótio Regional informado
 *     tags: [Local]
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         example: 31
 *         schema:
 *           type: integer
 *         description: Código do Escritório Regional para filtrar os Postos de atendimento Sebrae Aqui
 *     responses:
 *       200:
 *         description: Lista de Postos Sebrae Aqui retornada com sucesso
 *       404:
 *         description: Nenhum Posto encontrado para o Código do Escritório Regional Informado
 */
router.get('/listar/:idLocal', validacao.validarIdLocal, local.listarPorMatriz);

/**
 * @swagger
 * /local/listar/ativos/{idLocal}:
 *   get:
 *     summary: Listar todos os postos SEBRAE AQUI ativos vinculados ao Escritótio Regional
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO e Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint Lista todos os postos SEBRAE AQUI ativos vinculados ao Escritótio Regional
 *     tags: [Local]
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         example: 31
 *         schema:
 *           type: integer
 *         description: Código do Escritório Regional para filtrar os Postos de atendimento ativos
 *     responses:
 *       200:
 *         description: Lista de Postos de atendimento ativos retornada com sucesso
 *       404:
 *         description: Nenhum Posto de atendimento ativo encontrado para o Código do Escritório Regional Informado
 */
router.get('/listar/ativos/:idLocal', validacao.validarIdLocal, local.listarDisponiveisPorMatriz);

/**
 * @swagger
 * /local/consultar/{idLocal}:
 *   get:
 *     summary: Consultar informações de um local (Escritório Regional / Posto de Atendimento)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO e Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint Consultar informações de um local (Escritório Regional / Posto de Atendimento)
 *     tags: [Local]
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         example: 31
 *         schema:
 *           type: integer
 *         description: Consulta pelo Código do Escritório Regional informado
 *     responses:
 *       200:
 *         description: Informações do local (Escritório Regional ou Posto Sebrae Aqui) consultadas com sucesso
 *       404:
 *         description: Nenhum local (Escritório Regional ou Posto Sebrae Aqui) encontrado para o Código fornecido
 */
router.get('/consultar/:idLocal', validacao.validarIdLocal, local.consultar);

/**
 * @swagger
 * /local/contato/atualizar:
 *   put:
 *     summary: Atualizar informações de contato de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Atualiza informações de contato de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     tags: [Local] 
 *     requestBody:
 *       required: true
 *       description: Objeto e Model com as propriedades obrigatórias
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idLocal:
 *                 type: integer
 *                 example: 31
 *               idLocalMatriz:
 *                 type: integer
 *                 example: null
 *               email:
 *                 type: string
 *                 example: 'SP-E.R.Capital-Centro@sebraesp.com.br'
 *               telefone:
 *                 type: string
 *                 example: '1133852350'
 *               grupoFacebook:
 *                 type: string
 *                 example: null
 *               whatsapp:
 *                 type: string
 *                 example: '11995678948'
 *             required:
 *               - idLocal
 *               - email
 *               - telefone
 *           example:
 *             idLocal: 10
 *             idLocalMatriz: null
 *             email: 'SP-E.R.Capital-Centro@sebraesp.com.br'
 *             telefone: '1133852350'
 *             grupoFacebook: null
 *             whatsapp: '11995678948'
 *     responses:
 *       200:
 *         description: Informações de contato atualizadas com sucesso
 *       400:
 *         description: Erro de validação ou parâmetros inválidos
 *       404:
 *         description: Nenhum local encontrado para o ID fornecido
 */
 router.put('/contato/atualizar', auth.authorize, validacao.validarContato, local.atualizarContato);

/**
 * @swagger
 * /local/endereco/atualizar:
 *   put:
 *     summary: Atualizar informações de endereço de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Atualiza informações de endereço de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     tags: [Local]
 *     requestBody:
 *       required: true
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idLocal:
 *                 type: integer
 *                 example: 10
 *               idLocalTipo:
 *                 type: integer
 *                 example: 2
 *               CEP:
 *                 type: string
 *                 example: "01041000"
 *               logradouro:
 *                 type: string
 *                 example: "Rua Vinte e Quatro de Maio"
 *               numero:
 *                 type: string
 *                 example: "3251"
 *               complemento:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *               bairro:
 *                 type: string
 *                 example: "República"
 *               cidade:
 *                 type: string
 *                 example: "São Paulo"
 *               UF:
 *                 type: string
 *                 example: "SP"
 *             required:
 *               - idLocal
 *               - idLocalTipo
 *               - CEP
 *               - logradouro
 *               - numero
 *               - bairro
 *               - cidade
 *               - UF
 *           example:
 *             idLocal: 10
 *             idLocalTipo: 2
 *             CEP: "01041000"
 *             logradouro: "Rua Vinte e Quatro de Maio"
 *             numero: "32"
 *             complemento: null
 *             bairro: "República"
 *             cidade: "São Paulo"
 *             UF: "SP"
 *     responses:
 *       200:
 *         description: Informações de endereço atualizadas com sucesso
 *       400:
 *         description: Erro de validação ou parâmetros inválidos
 *       404:
 *         description: Nenhum local encontrado para o Código do local (Escritório Regional ou Posto Sebrae Aqui) fornecido
 */
 router.put('/endereco/atualizar', auth.authorize, validacao.validarEndereco, local.atualizarEndereco);

/**
 * @swagger
 * /local/horario/atualizar:
 *   put:
 *     summary: Atualizar horários de funcionamento de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Atualiza horários de funcionamento de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     tags: [Local] 
 *     requestBody:
 *       required: true
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idLocal:
 *                 type: integer
 *                 example: 24
 *               idDiasAtendimento:
 *                 type: integer
 *                 example: 3
 *               horarioInicio:
 *                 type: string
 *                 example: "08:48"  
 *               intervaloInicio:
 *                 type: string
 *                 example: "12:00"
 *               intervaloFim:
 *                 type: string
 *                 example: "13:30"
 *               horarioFim:
 *                 type: string
 *                 example: "19:38"
 *             required:
 *               - idLocal
 *               - idDiasAtendimento
 *               - horarioInicio
 *               - horarioFim
 *           example:
 *             idLocal: 24
 *             idDiasAtendimento: 3
 *             horarioInicio: "08:48"
 *             intervaloInicio: "12:00"
 *             intervaloFim: "13:30"
 *             horarioFim: "19:38"
 *     responses:
 *       200:
 *         description: Horários de funcionamento atualizados com sucesso
 *       400:
 *         description: Erro de validação ou parâmetros inválidos
 *       404:
 *         description: Nenhum local encontrado para o Código do local (Escritório Regional ou Posto Sebrae Aqui) fornecido
 */
 router.put('/horario/atualizar', auth.authorize, validacao.validarHorario, local.atualizarHorario);

/**
 * @swagger
 * /local/servicos/atualizar:
 *   put:
 *     summary: Atualizar serviços oferecidos por um Código de local (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Atualiza serviços oferecidos por um Código de local (Escritório Regional ou Posto Sebrae Aqui)
 *     tags: [Local] 
 *     requestBody:
 *       required: true
 *       description: Objeto e Model com as propriedades obrigatórias
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idLocal:
 *                 type: integer
 *                 example: 31                
 *               servicosOferecidos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example:
 *                     - Capacitação
 *                     - Aluguel de salas
 *                     - Aluguel de equipamentos
 *                     - Consultoria
 *                     - Auditoria
 *                     - Análises
 *                     - Orientações digitais
 *             required:
 *               - idLocal 
 *           example:
 *             idLocal: 31
 *             servicosOferecidos:
 *               - Capacitação
 *               - Aluguel de salas
 *               - Aluguel de equipamentos
 *               - Consultoria
 *               - Auditoria
 *               - Análises
 *               - Orientações digitais
 *     responses:
 *       200:
 *         description: Serviços oferecidos atualizados com sucesso
 *       400:
 *         description: Erro de validação ou parâmetros inválidos
 *       404:
 *         description: Nenhum local encontrado para o Código do local (Escritório Regional ou Posto Sebrae Aqui) fornecido
 */
 router.put('/servicos/atualizar', auth.authorize, validacao.validarServicos, local.atualizarServicos);

/**
 * @swagger
 * /local/imagem/atualizar/{idLocal}:
 *   put:
 *     summary: Atualizar imagem de um local (Escritório Regional)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Atualiza imagem de um local (Escritório Regional)
 *     tags: [Local]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         schema:
 *           type: integer
 *         example: 31
 *         description: Código do local (Escritório Regional) para atualização de imagem
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               arquivo:
 *                 type: string
 *                 description: Arquivo de imagem da Fachada do Escritório Regional
 *                 format: binary
 *                 required: true
 *           example:
 *             arquivo: [Exemplo do arquivo de imagem]
 *           required:
 *              - idLocal
 *              - arquivo
 *     responses:
 *       200:
 *         description: Imagem do local atualizada com sucesso
 *       400:
 *         description: Erro de validação ou parâmetros inválidos
 *       404:
 *         description: Nenhum local encontrado para o Código do local (Escritório Regional) fornecido
 */
 router.put('/imagem/atualizar/:idLocal', auth.authorize, validacao.validarAlteracaoImagem, local.atualizarImagem);

/**
 * @swagger
 * /local/inativar/{idLocal}:
 *   put:
 *     summary: Inativar um local (Posto de Atendimento Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Inativa um local (Posto de Atendimento Sebrae Aqui)
 *     tags: [Local]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLocal (Código do Posto de Atendimento Sebrae Aqui)
 *         required: true
 *         schema:
 *           type: string
 *         example: 3193
 *         description: ID do local (Código do Posto de Atendimento Sebrae Aqui) para inativação
 *     responses:
 *       200:
 *         description: Local (Posto de Atendimento Sebrae Aqui) inativado com sucesso
 *       400:
 *         description: Erro de validação ou parâmetros inválidos
 *       404:
 *         description: Nenhum local encontrado para o Código do Posto de Atendimento Sebrae Aqui fornecido
 */
router.put('/inativar/:idLocal',  auth.authorize, validacao.validarInativar, local.inativar);

/**
 * @swagger
 * /local/aviso/{idLocal}:
 *   put:
 *     summary: Adicionar ou Atualizar o campo aviso importante, para um (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Adiciona ou Atualiza o campo aviso importante, para um (Escritório Regional ou Posto Sebrae Aqui)
 *     tags: [Local]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         example: 31
 *         schema:
 *           type: integer
 *         description: ID do local (Código do Escritório Regional ou Posto Sebrae Aqui) para adicionar ou atualizar o campo aviso
 *     requestBody: 
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:          
 *               avisoImportante:
 *                 type: string
 *                 example: "Exemplo de aviso importante"
 *             required:
 *               - avisoImportante
 *           example:
 *             avisoImportante: "Exemplo de aviso importante"
 *     responses:
 *       200:
 *         description: Sua solicitação foi processada com sucesso.
 *       400:
 *         description: Erro de validação ou parâmetros inválidos
 *       404:
 *         description: Nenhum local encontrado para o Código do Escritório Regional ou Posto de Atendimento Sebrae Aqui fornecido
 */
 router.put('/aviso/:idLocal', auth.authorize, validacao.validarIdLocal, local.atualizarAviso);

/**
 * @swagger
 * /local/slug/atualizar:
 *   put:
 *     summary: Atualizar o slug dos postos Sebrae Aqui
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Atualiza o slug dos postos Sebrae Aqui
 *     tags: [Local]
 *     security:
 *       - BearerAuth: []
 *     requestBody: 
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:          
 *               nome:
 *                 type: string
 *                 example: "SEBRAE AQUI - ANGATUBA"
 *               slug:
 *                 type: string
 *                 example: "angatuba"
 *               idLocal:
 *                 type: integer
 *                 example: 3140
 *             required: 
 *                 - nome
 *                 - slug
 *                 - idLocal
 *             example:              
 *               "nome": "SEBRAE AQUI - ANGATUBA"
 *               "slug": "sorocabaangatuba"
 *               "idLocal": 3140
 *     responses:
 *       200:
 *         description: Sua solicitação foi processada com sucesso.
 *       400:
 *         description: Erro de validação ou parâmetros inválidos
 *       404:
 *         description: Nenhum local encontrado para o Código do local (Posto de Atendimento Sebrae Aqui) fornecido
 */
router.put('/slug/atualizar', auth.authorize, validacao.validarSlug, local.atualizarSlug);

/**
 * @swagger
 * /local/email/{idLocal}:
 *   put:
 *     summary: Atualizar o email para recebimento de alertas do ER
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Atualiza o email para recebimento de alertas do ER
 *     tags: [Local]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         schema:
 *           type: integer
 *         example: 31
 *         description: Código do local (Escritório Regional) para atualização do e-mail
 *     requestBody: 
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:          
 *               email:
 *                 type: string
 *                 example: "exemplo@sebraesp.com.br"
 *             required: 
 *                 - email
 *             example:              
 *               "email": "exemplo@sebraesp.com.br"
 *     responses:
 *       200:
 *         description: Sua solicitação foi processada com sucesso.
 *       400:
 *         description: Erro de validação ou parâmetros inválidos
 *       404:
 *         description: Nenhum local encontrado para o Código do local (Posto de Atendimento Sebrae Aqui) fornecido
 */
router.put('/email/:idLocal', auth.authorize, validacao.validarEmail, local.atualizarEmail);

// Descontinuado
// router.post('/endereco/cadastrar', auth.authorize, validacao.validarEndereco, local.cadastrarEndereco);
module.exports = router;