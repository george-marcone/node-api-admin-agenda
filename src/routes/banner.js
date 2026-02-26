'use strict'
const express = require('express');
const router = express.Router();
const banner = require('../controllers/banner');
const validacao = require('../validacoes/banner');
const auth = require('../services/auth');


/**
 * @swagger
 * tags:
 *   name: Banner
 *   description: Endpoints relacionados a banners
 */

/**
 * @swagger
 * /banner/listar/{idLocal}:
 *   get:
 *     tags: [Banner]
 *     summary: Retorna uma lista de banners por ID de Local (Escritório Regional)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO e Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna uma lista de banners por ID de Local (Escritório Regional).
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Local
 *     responses:
 *       200:
 *         description: Sucesso ao listar banners por ID de Local
 *       500:
 *         description: Erro ao listar banners por ID de Local
 */
router.get('/listar/:idLocal', banner.listar);

/**
 * @swagger
 * /banner/atualizar/{idLocal}:
 *   put:
 *     tags: [Banner]
 *     summary: Atualizar um banner recebendo um ID de Local (Código do Escritótio Regional) como parâmetro
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Atualizar um banner recebendo um ID de Local (Código do Escritótio Regional) como parâmetro
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
 *               idBanner: 
 *                 type: integer
 *                 description: ID do Banner *(Obrigatório)
 *                 example: 123
 *               titulo:
 *                 type: string
 *                 description: Título do Banner
 *                 example: Meu Banner
 *               link:
 *                 type: string
 *                 description: Link do Banner *(Obrigatório)
 *                 example: https://www.example.com
 *               arquivo:
 *                 type: string
 *                 description: Arquivo de imagem do Banner *(Obrigatório)
 *                 format: binary
 *                 example: banner.jpg
 *             required:
 *               - idBanner
 *               - link
 *               - arquivo
 *     responses:
 *       200:
 *         description: Sucesso ao atualizar o banner do Escritório Regional
 *       500:
 *         description: Erro ao atualizar o banner do Escritório Regional
 */
 router.put('/atualizar/:idLocal', auth.authorize, validacao.validarCadastro, banner.atualizar);

/**
 * @swagger
 * /banner/excluir/{idBanner}:
 *   put:
 *     tags: [Banner]
 *     summary: Exclui/Inativa um banner por ID (Código do Banner)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Exclui/Inativa um banner por ID (Código do Banner)
 *     parameters:
 *       - in: path
 *         name: idBanner
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Banner
 *     responses:
 *       200:
 *         description: Sucesso ao excluir um banner por ID
 *       500:
 *         description: Erro ao excluir um banner por ID
 */
router.put('/excluir/:idBanner', auth.authorize, validacao.validarIdBanner, banner.excluir);

/**
 * @swagger
 * /banner/publicar/{idBanner}:
 *   put:
 *     tags: [Banner]
 *     summary: Publica um banner por ID (Código do Banner)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Publica um banner por ID (Código do Banner)
 *     parameters:
 *       - in: path
 *         name: idBanner
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Banner
 *     responses:
 *       200:
 *         description: Sucesso ao publicar um banner por ID
 *       500:
 *         description: Erro ao publicar um banner por ID
 */
router.put('/publicar/:idBanner', auth.authorize, validacao.validarIdBanner, banner.publicar);

/**
 * @swagger
 * /banner/ordenar:
 *   put:
 *     tags: [Banner]
 *     summary: Ordenação dos Banners publicados de um Escritório Regional
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint faz a ordenação dos Banners publicados de um Escritório Regional 
 *     requestBody:
 *       required: true
 *       description: Array de Banner a ser ordenado
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 idBanner:
 *                   type: integer
 *                   example:
 *                 idLocal:
 *                   type: integer
 *                   example: 31
 *               required:
 *                 - idBanner
 *                 - idLocal
 *             example:
 *               - idBanner: 83
 *                 idLocal: 31
 *               - idBanner: 82
 *                 idLocal: 31
 *               - idBanner: 79
 *                 idLocal: 31
 *               - idBanner: 80
 *                 idLocal: 31
 *               - idBanner: 78
 *                 idLocal: 31
 *               - idBanner: 77
 *                 idLocal: 31
 *     responses:
 *       200:
 *         description: Sucesso ao ordenar os banners
 *       500:
 *         description: Erro ao ordenar os banners
 */
router.put('/ordenar', auth.authorize, validacao.validarOrdenar, banner.priorizarBanners);
 
/**
 * @swagger
 * /banner/adicionar/{idLocal}:
 *   post:
 *     tags: [Banner]
 *     summary: Adiciona um banner recebendo como parâmetro o  idLocal (Código do Escritório Regional)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Adiciona um banner recebendo como parâmetro o  idLocal (Código do Escritório Regional)
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true 
 *         schema:
 *           type: integer
 *         description: ID do Local (Código do Escritótio Regional)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Título do Banner
 *               link:
 *                 type: string
 *                 description: Link do Banner *(Obrigatório) 
 *                 example: https://www.example.com
 *               arquivo:
 *                 type: string
 *                 description: Arquivo de imagem do Banner *(Obrigatório)
 *                 format: binary 
 *                 example: banner.jpg
 *             example:
 *               titulo: Título do Banner
 *               link: https://www.example.com
 *               arquivo: banner.jpg
 *             required:
 *               - link
 *               - arquivo
 *     responses:
 *       200:
 *         description: Sucesso ao adicionar um banner para o Escritótio Regional
 *       500:
 *         description: Erro ao adicionar um banner para o Escritótio Regional
 */
router.post('/adicionar/:idLocal', auth.authorize, validacao.validarCadastro, banner.cadastrar);
 
module.exports = router;