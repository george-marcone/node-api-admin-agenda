const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('../config');
const path = require('path');

const routesPath = path.join(__dirname, '../routes/');

let options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API Agenda e Admin-agenda',
      version: '3.2.0',
      description: `API das aplicações Agenda e Admin-agenda
    
      [Baixar Collection Postman](http://${process.env.NODE_ENV.includes('hom') ? 'homologacao-apiagenda.sebraesp.com.br' : 'localhost:3003'}/swagger.json)
      `,
    },    
    servers: [
      {
        url: "https://homologacao-apiagenda.sebraesp.com.br"
      },

      // {
      //   url: "http://localhost:3003"
      // }
    ],
    tags: [
      { name: 'Campanhas' }, // Nome personalizado para a seção de endpoints das Campanhas
      { name: 'Estatisticas' }, // Nome personalizado para a seção de endpoints das Estatísticas
      { name: 'Ebook' }, // Nome personalizado para a seção de endpoints do Material de Apoio
      { name: 'Consultoria' }, // Nome personalizado para a seção de endpoints da Consultoria
      { name: 'Local' }, // Nome personalizado para a seção de endpoints do Local
      { name: 'Evento' }, // Nome personalizado para a seção de endpoints do Evento
      { name: 'Banner' }, // Nome personalizado para a seção de endpoints do Banner
    ],
    security: [
      {
        BearerAuth: [], // Esquema de segurança Bearer Token
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {  // Definição do esquema de segurança Bearer Token
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    `${routesPath}/campanha.js`,
    `${routesPath}/estatistica.js`,
    `${routesPath}/material-apoio.js`,
    `${routesPath}/consultoria.js`,
    `${routesPath}/local.js`,
    `${routesPath}/evento.js`,
    `${routesPath}/banner.js`,
  ],  
};

console.log

if (process.env.NODE_ENV === 'dev') {
  options.definition.servers.unshift({url: "http://localhost:3003"});
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'prod') {
    
    app.get('/swagger.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        docExpansion: 'none',
      }
    }));
  }
};