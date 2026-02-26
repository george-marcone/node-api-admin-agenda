'use strict';
const express = require('express');
const router = express.Router();
const consultoria = require('../controllers/consultoria');
const validacao = require('../validacoes/consultoria');
const auth = require('../services/auth');

/**
 * @swagger
 * tags:
 *   - name: Consultoria
 *     description: Endpoints relacionados as Consultorias
 */

/**
 * @swagger
 * /consultoria/listar/{idLocal}:
 *   get:
 *     tags: [Consultoria]
 *     summary: Lista as consultorias de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint lista as consultorias de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     parameters:
 *       - name: idLocal
 *         in: path
 *         description: ID do local (Código do Escritório Regional ou Posto Sebrae Aqui)
 *         required: true
 *         schema:
 *           type: integer
 *         example: 31
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erro ao listar Consultorias 
 */
router.get('/listar/:idLocal', validacao.validarListar, consultoria.listarPorIdLocal);

/**
 * @swagger
 * /consultoria/listar/disponiveis/consultoria/{idLocal}:
 *   get:
 *     tags: [Consultoria]
 *     summary: Lista as consultorias dispóníveis de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint lista as consultorias disponíveis de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     parameters:
 *       - name: idLocal
 *         in: path
 *         description: ID do local (Código do Escritório Regional ou Posto Sebrae Aqui)
 *         required: true
 *         schema:
 *           type: integer
 *         example: 31
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erro ao listar Consultorias 
 */
router.get('/listar/disponiveis/consultoria/:idLocal', validacao.validarListar, consultoria.listarDisponiveisPorLocal);

/**
 * @swagger
 * /consultoria/divulgar/mkt:
 *   get:
 *     tags: [Consultoria]
 *     summary: Lista numa planilha de excel os cursos e consultorias disponíveis para divulgação do Marketing
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Lista numa planilha de excel os cursos e consultorias disponíveis para divulgação do Marketing
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Informação não disponível 
 */
router.get('/divulgar/mkt', auth.authorize, consultoria.listarMarketingDivulgar);

/**
 * @swagger
 * /consultoria/interessados/listar/{idLocal}:
 *   get:
 *     tags: [Consultoria]
 *     summary: Lista os interessados pelas consultorias de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Lista os interessados pelas consultorias de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     parameters:
 *       - name: idLocal
 *         in: path
 *         description: ID do local (Código do Escritório Regional ou Posto Sebrae Aqui)
 *         required: true
 *         schema:
 *           type: integer
 *         example: 31
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erro ao listar os interessados
 */
router.get('/interessados/listar/:idLocal', consultoria.listarInteressados);

/**
 * @swagger
 * /consultoria/ordenar:
 *   put:
 *     tags:
 *       - Consultoria
 *     summary: Ordena as consultorias de um Escritório Regional
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Ordena as consultorias de um Escritório Regional
 *     requestBody:
 *       required: true
 *       description: Array e Model obrigatório de Consultorias a ser ordenado ...
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payload:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idAtendimento:
 *                       type: integer
 *                       example: 25294085
 *                     idLocal:
 *                       type: integer
 *                       example: 31
 *                   required:
 *                     - idAtendimento
 *                     - idLocal
 *             example:
 *               payload:
 *                 - idAtendimento: 25294085
 *                   idLocal: 31
 *                 - idAtendimento: 25338948
 *                   idLocal: 31
 *                 - idAtendimento: 25344191
 *                   idLocal: 31
 *                 - idAtendimento: 25338835
 *                   idLocal: 31
 *                 - idAtendimento: 25340397
 *                   idLocal: 31
 *     responses:
 *       200:
 *         description: Cursos ordenados com sucesso
 *       400:
 *         description: Erro ao ordenar os cursos
 */
router.put('/ordenar', auth.authorize, validacao.validarOrdenar, consultoria.ordenacao);

/**
 * @swagger
 * /consultoria/destacar:
 *   put:
 *     tags:
 *       - Consultoria
 *     summary: Destaca uma consultoria publicado, separando-o das demais consultorias publicados que não estão destacados
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Destaca uma consultoria publicado, separando-o das demais consultorias publicados que não estão destacados
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
 *               idConsultoria:
 *                 type: integer
 *                 example: 25347688
 *               destaque:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - idLocal
 *               - idConsultoria
 *               - destaque
 *     responses:
 *       200:
 *         description: Consultoria destacada com sucesso
 *       400:
 *         description: Erro ao destacar consultoria
 */
router.put('/destacar', auth.authorize, validacao.validarDestacar, consultoria.destaque);

/**
 * @swagger
 * /consultoria/editar: 
 *   put:
 *     tags:
 *       - Consultoria
 *     summary: Edita algumas informações de uma consultoria de um Escritório Regional
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Edita algumas informações de uma consultoria de um Escritório Regional
 *     requestBody:
 *       required: true
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProduto:
 *                 type: integer
 *                 example: 4499
 *               idLocal:
 *                 type: integer
 *                 example: 10
 *               habilitarFormulario:
 *                 type: boolean
 *                 example: false
 *               maisInformacoes:
 *                 type: string
 *                 example: "Informações adicionais acrescentadas com sucesso"
 *             required:
 *               - idProduto
 *               - idLocal 
 *     responses:
 *       200:
 *         description: Consultoria editada com sucesso
 *       400:
 *         description: Erro ao editar consultoria
 */
router.put('/editar', validacao.validarEditar, consultoria.editarConsultoria);

/**
 * @swagger
 * /consultoria/interessados/excluir/{idInteracao}:
 *   put:
 *     tags: [Consultoria]
 *     summary: Exclui (Inativa um interessado em uma ou mais consultoria)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Exclui (Inativa um interessado em uma ou mais consultoria)
 *     parameters:
 *       - name: idInteracao
 *         in: path
 *         description: ID do interessado
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Sucesso ao excluir um Interessado por ID
 *       500:
 *         description: Erro ao excluir um Interessado por ID
 */
router.put('/interessados/excluir', auth.authorize, validacao.validarExcluirInteressado, consultoria.excluirInteressado);

/**
 * @swagger
 * /consultoria/marketing:
 *   put:
 *     tags:
 *       - Consultoria
 *     summary: Altera a flag que indica se essa consultoria vai ser disponibilizada para o marketing
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Altera a flag que indica se essa consultoria vai ser disponibilizada para o marketing
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
 *               idConsultoria:
 *                 type: integer
 *                 example: 4499
 *               divulgarMarketing:
 *                 type: boolean
 *                 example: false
 *             required:
 *               - idLocal
 *               - idConsultoria
 *     responses:
 *       200:
 *         description: Consultoria publicado ou ocultado com sucesso
 *       400:
 *         description: Erro ao publicar ou ocultar consolturia
 */
router.put('/marketing', auth.authorize, validacao.validarMarketing, consultoria.marketing);

/**
 * @swagger
 * /consultoria/disponibilizar:
 *   post:
 *     tags:
 *       - Consultoria
 *     summary: Publica ou oculta uma consultoria de um Escritório Regional
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Publica ou oculta uma consultoria de um Escritório Regional
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
 *               idConsultoria:
 *                 type: integer
 *                 example: 4499
 *               habilitarFormulario:
 *                 type: boolean
 *                 example: false
 *             required:
 *               - idLocal
 *               - idConsultoria
 *     responses:
 *       200:
 *         description: Consultoria publicado ou ocultado com sucesso
 *       400:
 *         description: Erro ao publicar ou ocultar consolturia
 */
router.post('/disponibilizar', auth.authorize, validacao.validarDisponibilizar, consultoria.disponibilizar);

/**
 * @swagger
 * /consultoria/disponibilizar/lote:
 *   post:
 *     tags:
 *       - Consultoria
 *     summary: Publica ou oculta todos as consultorias de um Escritório Regional
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint Publica ou oculta todos as consultorias de um Escritório Regional
 *     requestBody:
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idLocal:
 *                 type: integer
 *                 example: 22
 *             required:
 *               - idLocal
 *     responses:
 *       200:
 *         description: Consultorias publicadas ou ocultados em lote com sucesso
 *       400:
 *         description: Erro ao publicar ou ocultar as consultorias em lote
 */
router.post('/disponibilizar/lote', auth.authorize, validacao.validarDisponibilizarEmLote, consultoria.disponibilizarEmLote);

/**
 * @swagger
 * /consultoria/interessados/inscricao:
 *   post:
 *     tags:
 *       - Consultoria
 *     summary: Cadastra o interessado pela Consultoria
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint Cadastra o interessado pela Consultoria
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
 *                 example: 6575
 *               name:
 *                 type: string
 *                 example: 'George Marcone Morais dos Santos'
 *               telefone: 
 *                 type: string
 *                 example: '81997972323'
 *               email: 
 *                 type: string
 *                 example: 'email@email.com'
 *             required:
 *               - idLocal
 *               - idProduto
 *               - name
 *               - telefone
 *               - email
 *     responses:
 *       200:
 *         description: Interessado cadastrado com sucesso
 *       400:
 *         description: Erro ao publicar ou ocultar consultoria
 */
router.post('/interessados/inscricao', auth.authorize,
    validacao.validarCadastroInteressado, consultoria.cadastrarInteressado);

module.exports = router;