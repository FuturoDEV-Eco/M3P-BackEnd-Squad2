const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const connection = require('./database/connection');
const SERVER_PORT = process.env.APP_PORT;
class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    server.use(routes);
    this.initilize(server);
  }

  async middlewares(server) {
    console.log('Checando middlewares... // Checking middlewares...');
    server.use(cors()); // habilita o CORS quando em produção // enables CORS when in production
    server.use(express.json()); // habilita o body parser // enables body parser
    console.log(
      'Checando middlewares concluídos... // Checking middlewares completed...'
    );
  }

  async database() {
    try {
      console.log(
        'Conectando ao banco de dados... // Connecting to database...'
      );
      await connection.authenticate();
    } catch (error) {
      console.log(
        'Erro ao conectar ao banco // Error connecting to database',
        error
      );
    }
  }

  async initilize(server) {
    console.log('Iniciando o servidor... // Starting server...');
    server.listen(SERVER_PORT, () => {
      console.log(
        `Servidor iniciado na porta: ${SERVER_PORT}! // Starting server on port: ${SERVER_PORT}!`
      );
    });
  }
}

module.exports = { Server };
