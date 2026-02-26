'use strict';
const express = require('express');
const router = express.Router();
const estatistica = require('../controllers/estatistica');
const auth = require('../services/auth');

/**
 * @swagger
 * tags:
 *   name: Estatisticas
 *   description: Endpoints relacionados às estatísticas
 */

/**
 * @swagger
 * /estatistica/acessos/{idLocal}:
 *   get:
 *     tags: [Estatisticas]
 *     summary: Retorna uma lista de acessos mensais por ID de Local (Escritório Regional).
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna uma lista de acessos mensais por ID de Local (Escritório Regional).
 *     parameters:
 *       - in: path
 *         name: idLocal
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Local
 *     responses:
 *       200:
 *         description: Sucesso ao listar os acessos por ID de Local
 *       500:
 *         description: Erro ao listar os acessos por ID de Local
 */
router.get('/acessos/:idLocal', auth.authorize, estatistica.listar);

/**
 * @swagger
 * /estatistica/acessos/mensal/{mes}/{ano}:
 *   get:
 *     tags: [Estatisticas]
 *     summary: Retorna uma lista de acessos mensais por mês e ano.
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna uma lista de acessos por mês e ano.
 *     parameters:
 *       - in: path
 *         name: mes
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mês
 *       - in: path
 *         name: ano
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ano
 *     responses:
 *       200:
 *         description: Sucesso ao listar os acessos por mês e ano
 *       500:
 *         description: Erro ao listar os acessos por mês e ano
 */
router.get('/acessos/mensal/:mes/:ano', auth.authorize, estatistica.listarTodos);

/**
 * @swagger
 * /estatistica/banners:
 *   get:
 *     tags: [Estatisticas]
 *     summary: Retorna dados dos banners cadastrados.
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna  dados dos banners cadastrados.
 *     responses:
 *       200:
 *         description: Sucesso ao retornar informações dos banners
 *       500:
 *         description: Erro ao retornar informações dos banners
 */
router.get('/banners', auth.authorize, estatistica.banner);

/**
 * @swagger
 * /estatistica/banners/locais:
 *   get:
 *     tags: [Estatisticas]
 *     summary: Retorna locais sem banners publicados.
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna localis sem banners publicados
 *     responses:
 *       200:
 *         description: Sucesso ao retornar locais sem banners publicados
 *       500:
 *         description: Erro ao retornar locais sem banners publicados
 */
router.get('/banners/locais', auth.authorize, estatistica.bannerLocalPublicados);

/**
 * @swagger
 * /estatistica/consultorias:
 *   get:
 *     tags: [Estatisticas]
 *     summary: Retorna dados das consultorias cadastradas.
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna dados das consultorias cadastradas. 
 *     responses:
 *       200:
 *         description: Sucesso ao retornar informações das consultorias
 *       500:
 *         description: Erro ao retornar informações das consultorias
 */
router.get('/consultorias', auth.authorize, estatistica.consultoria);

/**
 * @swagger
 * /estatistica/consultorias/locais:
 *   get:
 *     tags: [Estatisticas]
 *     summary: Retorna locais sem consultorias publicadas.
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna locais sem consultorias publicadas.
 *     responses:
 *       200:
 *         description: Sucesso ao retornar locais sem consultorias publicadas
 *       500:
 *         description: Erro ao retornar locais sem consultorias publicadas
 */
router.get('/consultorias/locais', auth.authorize, estatistica.consultoriaLocalPublicadas);

/**
 * @swagger
 * /estatistica/cursos:
 *   get:
 *     tags: [Estatisticas]
 *     summary: Retorna dados dos cursos cadastrados.
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna dados dos cursos cadastrados.
 *     responses:
 *       200:
 *         description: Sucesso ao retornar informações dos cursos
 *       500:
 *         description: Erro ao retornar informações dos cursos
 */
router.get('/cursos', auth.authorize, estatistica.cursos);

/**
 * @swagger
 * /estatistica/cursos/locais:
 *   get:
 *     tags: [Estatisticas]
 *     summary: Retorna locais sem cursos publicados
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna a lista de locais que não possuem cursos publicados.
 *     responses:
 *       200:
 *         description: Sucesso ao retornar locais sem cursos publicados
 *       500:
 *         description: Erro ao retornar locais sem cursos publicados
 */
router.get('/cursos/locais', auth.authorize, estatistica.cursosLocalPublicados);

/**
 * @swagger
 * /estatistica/download:
 *   get:
 *     tags: [Estatisticas]
 *     summary: Retorna dados dos downloads feitos.
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna dados dos downloads de ebooks feitos.
 *     responses:
 *       200:
 *         description: Sucesso ao retornar informações dos downloads
 *       500:
 *         description: Erro ao retornar informações dos downloads
 */
router.get('/download', auth.authorize, estatistica.download);


module.exports = router;