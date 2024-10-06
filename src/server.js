const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const connection = require('./database/connection');
const SERVER_PORT = process.env.APP_PORT || 3001;

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    server.use(routes);
    this.initialize(server);
  }

  middlewares(server) {
    console.log('Checando middlewares... // Checking middlewares...');

    // Configuração do CORS
    const allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173'];

    server.use(
      cors({
        origin: allowedOrigins,
        credentials: true, // Permitir o envio de cookies
      })
    );

    server.use(express.json()); // habilita o body parser
    server.use(cookieParser()); // habilita o cookie parser

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
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
      console.log(
        'Erro ao conectar ao banco // Error connecting to database',
        error
      );
    }
  }

  initialize(server) {
    console.log('Iniciando o servidor... // Starting server...');
    server.listen(SERVER_PORT, () => {
      console.log(
        `Servidor iniciado na porta: ${SERVER_PORT}! // Server started on port: ${SERVER_PORT}!`
      );
    });
  }
}

module.exports = { Server };
