'use strict';
const express = require('express');
const router = express.Router();
const evento = require('../controllers/evento');
const validacao = require('../validacoes/evento');
const auth = require('../services/auth');
/**
 * @swagger
 * tags:
 *   name: Evento
 *   description: Endpoints relacionados a Eventos
 */

/**
 * @swagger
 * /evento/listar/kit/{idKit}:
 *   get:
 *     tags:
 *       - Evento
 *     summary: Retorna todos os eventos através do idKit
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna todos os eventos através do idKit
 *     requestBody:
 *     parameters:
 *       - name: idKit
 *         in: path
 *         description: ID do kit (Código do kit)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.get('/listar/kit/:idKit', evento.listarDisponiveisPorKit);

/**
 * @swagger
 * /evento/listar/produto/{idProduto}:
 *   get:
 *     tags:
 *       - Evento
 *     summary: Retorna todos os eventos através do idProduto
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna todos os eventos através do idProduto
 *     requestBody:
 *     parameters:
 *       - name: idProduto
 *         in: path
 *         description: ID do produto (Código do Produto)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.get('/listar/produto/:idProduto', evento.listarDisponiveisPorProduto);

/**
 * @swagger
 * /evento/listar/{idLocal}:
 *   get:
 *     tags: [Evento]
 *     summary: Lista os eventos de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna a lista dos eventos de um local (Escritório Regional ou Posto Sebrae Aqui)
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
 *         description: Erro ao listar eventos 
 */
router.get('/listar/:idLocal', validacao.validarListar, evento.listar);

/**
 * @swagger
 * /evento/listar/disponiveis/{idLocal}:
 *   get:
 *     tags: [Evento]
 *     summary: Lista os eventos disponíveis de um local (Escritório Regional ou Posto Sebrae Aqui)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint retorna uma lista dos eventos disponíveis de um local (Escritório Regional ou Posto Sebrae Aqui)
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
 *         description: Erro ao listar eventos disponíveis
 */
router.get('/listar/disponiveis/:idLocal', validacao.validarListar, evento.listarDisponiveis);

/**
 * @swagger
 * /evento/listar/qtd-disponiveis/{idLocal}:
 *   get:
 *     tags:
 *       - Evento
 *     summary: Quantidade de eventos disponíveis por tipo... Presencial, Online e Consultoria e Ebooks
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna a quantidade de eventos disponíveis por tipo... Presencial, Online e Consultoria e Ebooks
 *     parameters:
 *       - name: idLocal
 *         in: path
 *         description: ID do local (Código do Escritório Regional)
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erro ao retornar a quantidade de eventos disponíveis
 */
router.get('/listar/qtd-disponiveis/:idLocal', validacao.validarListar, evento.listarQtdDisponiveis);

/**
 * @swagger
 * /evento/listar/presenciais/{idLocal}:
 *   get:
 *     tags:
 *       - Evento
 *     summary: Retorna os Eventos presenciais disponíveis
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna os Eventos presenciais disponíveis
 *     parameters:
 *       - name: idLocal
 *         in: path
 *         description: ID do local (Código do Escritório Regional)
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erro ao retornar os eventos disponíveis
 */
router.get('/listar/disponiveis/presencial/:idLocal', validacao.validarListar, evento.listarPresenciaisDisponiveis);

/**
 * @swagger
 * /evento/listar/online/{idLocal}:
 *   get:
 *     tags:
 *       - Evento
 *     summary: Retorna os Eventos onlines disponíveis
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna os Eventos onlines disponíveis
 *     parameters:
 *       - name: idLocal
 *         in: path
 *         description: ID do local (Código do Escritório Regional)
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erro ao retornar os eventos disponíveis
 */
router.get('/listar/disponiveis/online/:idLocal', validacao.validarListar, evento.listarOnlinesDisponiveis);

/**
 * @swagger
 * /evento/listar/disponiveis/qtd-sebrae-aqui/{slug}:
 *   get:
 *     tags: [Evento]
 *     summary: Lista a quantidade dos eventos disponíveis do Posto Sebrae Aqui com base no slug (string que compõe parte da URL)
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna a quantidade dos eventos disponíveis do Posto Sebrae Aqui com base no slug (string que compõe parte da URL)
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug do Posto Sebrae Aqui
 *         required: true
 *         schema:
 *           type: string
 *         example: larsirio
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erro ao listar eventos disponíveis do Posto Sebrae Aqui
 */
router.get('/listar/disponiveis/qtd-sebrae-aqui/:slug', validacao.validarListarSebraeAqui, evento.listarQtdDisponiveisSebraeAqui);

 /**
 * @swagger
 * /evento/listar/presenciais/disponiveis/sebrae-aqui/{slug}:
 *   get:
 *     tags: [Evento]
 *     summary: Lista os eventos presenciais disponíveis do Posto Sebrae Aqui com base no slug (string que compõe parte da URL)
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna os eventos presenciais disponíveis do Posto Sebrae Aqui com base no slug (string que compõe parte da URL)
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug do Posto Sebrae Aqui
 *         required: true
 *         schema:
 *           type: string
 *         example: guaratingueta
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erro ao listar eventos disponíveis do Posto Sebrae Aqui
 */
router.get('/listar/disponiveis/presencial/sebrae-aqui/:slug', validacao.validarListarSebraeAqui, evento.listarPorModalidadeDisponiveisSebraeAqui);

 /**
 * @swagger
 * /evento/listar/online/disponiveis/sebrae-aqui/{slug}:
 *   get:
 *     tags: [Evento]
 *     summary: Lista os eventos online disponíveis do Posto Sebrae Aqui com base no slug (string que compõe parte da URL)
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna os eventos online disponíveis do Posto Sebrae Aqui com base no slug (string que compõe parte da URL)
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug do Posto Sebrae Aqui
 *         required: true
 *         schema:
 *           type: string
 *         example: lavrinhas 
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erro ao listar eventos disponíveis do Posto Sebrae Aqui
 */
router.get('/listar/disponiveis/online/sebrae-aqui/:slug', validacao.validarListarSebraeAqui, evento.listarPorModalidadeDisponiveisSebraeAqui);

/**
 * @swagger
 * /evento/atualizarPJ:
 *   put:
 *     tags:
 *       - Evento
 *     summary: Define se o evento será para pessoa jurídica ou não
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint define se o evento será para pessoa jurídica ou não
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
 *               idAtendimento:
 *                 type: integer
 *                 example: 25294085
 *               exclusivoPJ:
 *                 type: boolean
 *                 example: false
 *             required:
 *               - idLocal
 *               - idAtendimento
 *               - exclusivoPJ
 *             example:
 *               idLocal: 31
 *               idAtendimento: 25294085
 *               exclusivoPJ: false
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar evento
 */
 router.put('/atualizarPJ', auth.authorize, validacao.validarDisponibilizar, evento.atualizarPJ);

/**
 * @swagger
 * /evento/ordenar:
 *   put:
 *     tags:
 *       - Evento
 *     summary: Ordena os eventos de um Escritório Regional
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint ordena os eventos de um Escritório Regional
 *     requestBody:
 *       required: true
 *       description: Array e Model obrigatório de Cursos (eventos) a ser ordenado ...
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
 router.put('/ordenar', auth.authorize, validacao.validarOrdenar, evento.priorizarCursos);

/**
 * @swagger
 * /evento/destacar:
 *   put:
 *     tags:
 *       - Evento
 *     summary: Destaca um evento publicado, separando-o dos demais eventos publicados que não estão destacados
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint destaca um evento publicado, separando-o dos demais eventos publicados que não estão destacados
 *     requestBody:
 *       required: true
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idLocalAtendimento:
 *                 type: integer
 *                 example: 31
 *               idAtendimento:
 *                 type: integer
 *                 example: 25347688
 *               destaque:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - idLocalAtendimento
 *               - idAtendimento
 *               - destaque
 *     responses:
 *       200:
 *         description: Curso destacado com sucesso
 *       400:
 *         description: Erro ao destacar curso
 */
router.put('/destacar', auth.authorize, validacao.validarDestacar, evento.destacarCurso);
 
/**
 * @swagger
 * /evento/marketing:
 *   put:
 *     tags:
 *       - Evento
 *     summary: Edita a flag divulgar marketing de um evento de um Escritório Regional ou Posto Sebrae Aqui
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint edita a flag divulgar marketing de um evento de um Escritório Regional ou Posto Sebrae Aqui
 *     requestBody:
 *       required: true
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAtendimento:
 *                 type: integer
 *                 example: 32740
 *               idLocal:
 *                 type: integer
 *                 example: 31
 *               divulgarMarketing:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - idAtendimento
 *               - idLocal
 *               - divulgarMarketing
 *     responses:
 *       200:
 *         description: Evento editado com sucesso
 *       400:
 *         description: Erro ao editar evento
 */
router.put('/marketing', auth.authorize, validacao.validarMarketing, evento.marketing);

/**
 * @swagger
 * /evento/editar:
 *   put:
 *     tags:
 *       - Evento
 *     summary: Edita algumas informações de um evento de um Escritório Regional ou Posto Sebrae Aqui
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint edita algumas informações de um evento de um Escritório Regional ou Posto Sebrae Aqui
 *     requestBody:
 *       required: true
 *       description: Objeto e Model com as propriedades obrigatórias ...
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAtendimento:
 *                 type: integer
 *                 example: 32740
 *               idLocal:
 *                 type: integer
 *                 example: 31
 *               exclusivoPJ:
 *                 type: boolean
 *                 example: true
 *               maisInformacoes:
 *                 type: string
 *                 example: "Informações adicionais acrescentadas com sucesso"
 *             required:
 *               - idAtendimento
 *               - idLocal
 *               - exclusivoPJ
 *     responses:
 *       200:
 *         description: Evento editado com sucesso
 *       400:
 *         description: Erro ao editar evento
 */
 router.put('/editar', auth.authorize, validacao.validarEditar, evento.editarEvento);

/**
 * @swagger
 * /evento/disponibilizar:
 *   post:
 *     tags:
 *       - Evento
 *     summary: Publica ou oculta um evento de um Escritório Regional
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint publica ou oculta um evento de um Escritório Regional
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
 *               idAtendimento:
 *                 type: integer
 *                 example: 25347688
 *               exclusivoPJ:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - idLocal
 *               - idAtendimento
 *               - exclusivoPJ
 *     responses:
 *       200:
 *         description: Evento publicado ou ocultado com sucesso
 *       400:
 *         description: Erro ao publicar ou ocultar evento
 */
 router.post('/disponibilizar', auth.authorize, validacao.validarDisponibilizar, evento.disponibilizar);

/**
 * @swagger
 * /evento/disponibilizar/lote:
 *   post:
 *     tags:
 *       - Evento
 *     summary: Publica ou oculta todos os eventos de um Escritório Regional de acordo com a categoria informada (Presencial ou Online)
 *     description: |
 *       **Application: Admin - FERRAMENTA DE GESTÃO**
 *       
 *       Este endpoint publica ou oculta todos os eventos de um Escritório Regional de acordo com a categoria informada (Presencial ou Online)
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
 *               categoria:
 *                 type: string
 *                 example: "presencial"
 *               disponivel:
 *                 type: boolean
 *                 example: false
 *             required:
 *               - idLocal
 *               - categoria
 *               - disponivel
 *     responses:
 *       200:
 *         description: Eventos publicados ou ocultados em lot com sucesso
 *       400:
 *         description: Erro ao publicar ou ocultar os eventos em lote
 */
router.post('/disponibilizar/lote', auth.authorize, validacao.validarDisponibilizarEmLote, evento.disponibilizarEmLote); 

/**
 * @swagger
 * /evento/listar/por-produto-e-local:
 *   post:
 *     tags:
 *       - Evento
 *     summary: Retorna evento através do idProduto e idLocal
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna evento através do idProduto e idLocal
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
 *                 example: 6758 / 4443 / 3012
 *             required:
 *               - idLocal
 *               - idProduto 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.post('/listar/por-produto-e-local', evento.listarDisponiveisPorProdutoELocal);

/**
 * @swagger
 * /evento/personalizacao/kit:
 *   get:
 *     tags:
 *       - Evento
 *     summary: Retorna todos os eventos através do idKit
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna todos os eventos através do idKit
 *     requestBody:
 *     parameters:
 *       - name: idKit
 *         in: path
 *         description: ID do kit (Código do kit)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.get('/personalizacao', evento.listarDisponiveisPersonalizacao);

/**
 * @swagger
 * /evento/personalizacao/kit/{idKit}:
 *   get:
 *     tags:
 *       - Evento
 *     summary: Retorna todos os eventos através do idProduto
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna todos os eventos através do idProduto
 *     requestBody:
 *     parameters:
 *       - name: idProduto
 *         in: path
 *         description: ID do produto (Código do Produto)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.get('/personalizacao/kit/:idKit', validacao.validarIdKit, evento.consultarKitPersonalizacao);

/**
 * @swagger
 * /evento/personalizacao/produto/{idProduto}:
 *   get:
 *     tags:
 *       - Evento
 *     summary: Retorna todos os eventos através do idProduto
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna todos os eventos através do idProduto
 *     requestBody:
 *     parameters:
 *       - name: idProduto
 *         in: path
 *         description: ID do produto (Código do Produto)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.get('/personalizacao/produto/:idProduto', validacao.validarIdProduto, evento.consultarColetivoPersonalizacao);

/**
 * @swagger
 * /evento/personalizacao:
 *   get:
 *     tags:
 *       - Evento
 *     summary: Retorna todos os eventos através do idProduto
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna todos os eventos através do idProduto
 *     requestBody:
 *     parameters:
 *       - name: idProduto
 *         in: path
 *         description: ID do produto (Código do Produto)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.post('/personalizacao', auth.authorize, evento.inserirPersonalizacao);

/**
 * @swagger
 * /evento/personalizacao/kit/{idKit}:
 *   delete:
 *     tags:
 *       - Evento
 *     summary: Retorna todos os eventos através do idProduto
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna todos os eventos através do idProduto
 *     requestBody:
 *     parameters:
 *       - name: idKit
 *         in: path
 *         description: ID do produto (Código do Produto)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.delete('/personalizacao/kit/:idKit', auth.authorize, validacao.validarIdKit, evento.excluirKitPersonalizacao);

/**
 * @swagger
 * /evento/personalizacao/produto/{idProduto}:
 *   delete:
 *     tags:
 *       - Evento
 *     summary: Retorna todos os eventos através do idProduto
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna todos os eventos através do idProduto
 *     requestBody:
 *     parameters:
 *       - name: idProduto
 *         in: path
 *         description: ID do produto (Código do Produto)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.delete('/personalizacao/produto/:idProduto', auth.authorize, validacao.validarIdProduto, evento.excluirColetivoPersonalizacao);

/**
 * @swagger
 * /evento/faq/cadastro:
 *   post:
 *     tags:
 *       - Evento
 *     summary: Realiza o Cadastro, Update, e Delete do Faq
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint realiza o Cadastro, Update, e Delete do Faq, pode ser incluído até 5 perguntas com as respostas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProduto:
 *                 type: integer
 *                 nullable: true
 *                 example: 4446 // null
 *               idKit:
 *                 type: integer
 *                 nullable: true
 *                 example: null // 2222
 *               faq:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       nullable: true
 *                       example: 1
 *                     pergunta:
 *                       type: string
 *                       example: "Qual a pergunta 1?"
 *                     resposta:
 *                       type: string
 *                       example: "Esta é a resposta 1."
 *     responses:
 *       200:
 *         description: Evento cadastrado, atualizado ou deletado com sucesso
 *       400:
 *         description: Erro ao processar o evento
 */
router.post('/faq/cadastro', auth.authorize, evento.cadastrarFaq);

/**
 * @swagger
 * /evento/faq/excluir:
 *   delete:
 *     tags:
 *       - Evento
 *     summary: Realiza a exclusão do Faq
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint realiza a exclusão do Faq.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProduto:
 *                 type: integer
 *                 nullable: true
 *                 example: 4446 // null
 *               idKit:
 *                 type: integer
 *                 nullable: true
 *                 example: null // 4446
 *     responses:
 *       200:
 *         description: Evento excluído com sucesso
 *       400:
 *         description: Erro ao excluir evento
 */
router.delete('/faq/excluir', auth.authorize, evento.excluirFaq);


/**
 * @swagger
 * /evento/video:
 *   post:
 *     tags:
 *       - Evento
 *     summary: Realiza o Cadastro, Update do video
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint realiza o Cadastro, Update do video.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProduto:
 *                 type: integer
 *                 nullable: true
 *                 example: 4446 // null
 *               idKit:
 *                 type: integer
 *                 nullable: true
 *                 example: null // 2222
 *     responses:
 *       200:
 *         description: Evento cadastrado, atualizado ou deletado com sucesso
 *       400:
 *         description: Erro ao processar o evento
 */
router.post('/video', auth.authorize, evento.inserirVideo);

/**
 * @swagger
 * /evento/video/kit/{idKit}:
 *   delete:
 *     tags:
 *       - Evento
 *     summary: Retorna todos os eventos através do idProduto
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Este endpoint retorna todos os eventos através do idProduto
 *     requestBody:
 *     parameters:
 *       - name: idKit
 *         in: path
 *         description: ID do produto (Código do Produto)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.delete('/video/kit/:idKit', auth.authorize, evento.excluirKitVideo);

/**
 * @swagger
 * /evento/video/produto/{idProduto}:
 *   delete:
 *     tags:
 *       - Evento
 *     summary: Remove o video do produto personalizado
 *     description: |
 *       **Application: Agenda - PÁGINA DOS ESCRITÓRIOS**
 *       
 *       Remove o video do produto personalizado
 *     requestBody:
 *     parameters:
 *       - name: idProduto
 *         in: path
 *         description: ID do produto (Código do Produto)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5929 / 3772 
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *       400:
 *         description: Erro ao retornar evento
 */
router.delete('/video/produto/:idProduto', auth.authorize, evento.excluirProdutoVideo);

module.exports = router;