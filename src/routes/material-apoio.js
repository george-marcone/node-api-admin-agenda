'use strict';
const express = require('express');
const router = express.Router();
const material = require('../controllers/material-apoio');
const validacao = require('../validacoes/material-apoio');
const auth = require('../services/auth');

/**
 * @swagger
 * tags:
 *   - name: Ebook
 *     description: Endpoints relacionados ao Material de Apoio
 */

/**
 * @swagger
 * /material-apoio/consultar/{idProduto}:
 *   get:
 *     tags: [Ebook]
 *     summary: Consulta o material de apoio (Ebook informativo) da consultoria, por idProduto informado
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna o material de apoio (Ebook informativo) da consultoria, por idProduto informado.
 *     parameters:
 *       - name: idProduto
 *         in: path
 *         description: ID do produto (Código da consultoria)
 *         required: true
 *         schema:
 *           type: integer
 *         example: 6744
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Material de Apoio indisponível 
 */
router.get('/consultar/:idProduto', validacao.validarMaterialApoio, material.consultarMatApoioConsultoria);

/**
 * @swagger
 * /material-apoio/consultar/ebook/{idConteudoApoio}:
 *   get:
 *     tags: [Ebook]
 *     summary: Consulta o material de apoio (Ebook informativo) por código de produto
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna informações do material de apoio (ebook informativo) selecionado
 *     parameters:
 *       - name: idConteudoApoio
 *         in: path
 *         description: ID do conteudo Apoio (Código do Material de apoio)
 *         required: true
 *         schema:
 *           type: integer
 *         example: 455
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Material de Apoio indisponível 
 */
router.get('/consultar/ebook/:idConteudoApoio', validacao.validarConcultaMaterialApoio, material.consultarEbookPorIdProduto);

/**
 * @swagger
 * /material-apoio/listar/disponiveis/ebook/{idLocal}:
 *   get:
 *     tags: [Ebook]
 *     summary: lista o material de apoio (Ebook informativo) disponível 
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna a lista de materiais de apoio (ebook informativo) disponíveis
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Material de Apoio indisponível 
 */
router.get('/listar/disponiveis/ebook/:idLocal', material.listarEbooksDisponiveis);

/**
 * @swagger
 * /material-apoio/ebook/baixar:
 *   post: 
 *     tags: [Ebook]
 *     summary: Baixa o ebook (material de apoio) da consultoria desejada, após inscrição na mesma.
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna o ebook baixado (material de apoio) desejado.
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
 *               idProduto:
 *                 type: integer
 *                 example: 6744
 *               idConteudoApoio:
 *                 type: integer
 *                 example: 465
 *               token: 
 *                 type: string
 *                 example: "Valor_do_token_do_interessado"
 *             required:
 *               - idLocal
 *               - idProduto
 *               - idConteudoApoio  
 *               - token
 *     responses:
 *       200:
 *         description: Interessado cadastrado com sucesso
 *       400:
 *         description: Erro ao publicar ou ocultar consultoria
 */
router.post('/ebook/baixar', auth.authorize, validacao.validarEbook, material.registrarDownload);

module.exports = router;