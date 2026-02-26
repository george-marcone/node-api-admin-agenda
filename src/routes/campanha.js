'use strict';
const express = require('express');
const router = express.Router();
const campanha = require('../controllers/campanha');
const validacao = require('../validacoes/campanha');
const auth = require('../services/auth');

/**
 * @swagger
 * tags:
 *   name: Campanhas
 *   description: Endpoints relacionados às campanhas
 */

/**
 * @swagger
 * /campanha/listar/{idLocal}:
 *   get:
 *     tags: [Campanhas]
 *     summary: Retorna uma lista de campanhas por ID de Local (Escritório Regional)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO e Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna uma lista de campanhas por ID de Local (Escritório Regional).
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Local
 *     responses:
 *       200:
 *         description: Sucesso ao listar campanhas por ID de Local
 *       500:
 *         description: Erro ao listar campanhas por ID de Local
 */
router.get('/listar/:idLocal', campanha.listar);

/**
 * @swagger
 * /campanha/criar:
 *   post:
 *     tags: [Campanhas]
 *     summary: Cria uma campanha
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint cria uma campanha com os dados fornecidos.
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
 *                 example: 31
 *               idExecucaoKit:
 *                 type: integer
 *                 example: 31
 *               cor:
 *                 type: string
 *                 example: "test"
 *               tag:
 *                 type: string
 *                 example: "test"
 *               nome:
 *                 type: string
 *                 example: "test"
 *               img:
 *                 type: string
 *                 example: "test"
 *     responses:
 *       200:
 *         description: Sucesso ao criar a campanha
 *       500:
 *         description: Erro ao criar a campanha
 */
router.post('/criar/:idLocal',  auth.authorize, campanha.criar);


/**
 * @swagger
 * /campanha/atualizar/{idLocal}:
 *   put:
 *     tags: [Campanhas]
 *     summary: Atualizar uma campanha recebendo um ID de Local (Código do Escritótio Regional) como parâmetro
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Atualizar um campanha recebendo um ID de Local (Código do Escritótio Regional) como parâmetro
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Local (Código do Escritório Regional)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               idCampanha: 
 *                 type: integer
 *                 description: ID da campanha *(Obrigatório)
 *                 example: 123
 *               nome:
 *                 type: string
 *                 description: Nome da campanha
 *                 example: Minha campanha
 *               tag:
 *                 type: string
 *                 description: tag da campanha 
 *                 example: test
 *               imgCard:
 *                 type: string
 *                 description: Arquivo de imagem da campanha *(Obrigatório)
 *                 format: binary
 *                 example: campanha.jpg
 *             required:
 *               - idCamapnha
 *               - arquivo
 *     responses:
 *       200:
 *         description: Sucesso ao atualizar a campanha do Escritório Regional
 *       500:
 *         description: Erro ao atualizar a campanha do Escritório Regional
 */
router.put('/atualizar/:idLocal', auth.authorize, campanha.atualizar);

/**
 * @swagger
 * /campanha/excluir/{idCampanha}:
 *   put:
 *     tags: [Campanhas]
 *     summary: Atualizar uma campanha recebendo um ID da campanha como parâmetro
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint exclui uma campanha recebendo um ID da campanha como parâmetro
 *     parameters:
 *       - in: path
 *         name: idCampanha
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da campanha
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Sucesso ao excluir a campanha do Escritório Regional
 *       500:
 *         description: Erro ao excluir a campanha do Escritório Regional
 */
router.delete('/excluir/:idCampanha', auth.authorize, campanha.excluir);


/**
 * @swagger
 * /campanha/publicar/{idCampanha}:
 *   put:
 *     tags: [Campanhas]
 *     summary: Publicar uma campanha recebendo um ID da campanha como parâmetro
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint publicar ou despublica uma campanha recebendo um ID da campanha como parâmetro
 *     parameters:
 *       - in: path
 *         name: idCampanha
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da campanha
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Sucesso ao publicar/despublicar a campanha do Escritório Regional
 *       500:
 *         description: Erro ao publicar/despublicar a campanha do Escritório Regional
 */
router.put('/publicar/:idCampanha', auth.authorize, campanha.publicar);

module.exports = router;