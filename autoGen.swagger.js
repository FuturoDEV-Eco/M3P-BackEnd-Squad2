const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();
const SERVER_PORT = process.env.APP_PORT

const doc = {
  info: {
    title: "Destino Certo - API",
    description: "Documentação da Destino Certo - API - projeto final módulo 02",
    version: "1.0.0"
  },
  host: `localhost:${SERVER_PORT}`,
  security: [{"apiKeyAuth": []}],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Insira o token JWT"
    }
  }
};

const outputFile = './src/routes/doc.swagger.json';
const routes = ['./src/routes/routes.js'];

swaggerAutogen(outputFile, routes, doc);