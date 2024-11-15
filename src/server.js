const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const connection = require('./database/connection');

// Usar a porta fornecida pela variável APP_PORT ou 3001 localmente
const port = process.env.APP_PORT || 3001;

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    server.use(routes);
    this.initialize(server);
  }

  middlewares(server) {
    console.log('Checando middlewares...');

    // Configuração do CORS com o endereço do frontend no Vercel e Render
    const allowedOrigins = [
      'https://m3p-backend-destino-certo.onrender.com', // render
      'https://m3-p-front-end-squad2-destino-certo.vercel.app', // vercel
      'http://localhost:5173',
    ];

    server.use(
      cors({
        origin: allowedOrigins,
      })
    );

    server.use(express.json());

    console.log('Middlewares configurados.');
  }

  async database() {
    try {
      console.log('Conectando ao banco de dados...');
      await connection.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
      console.log('Erro ao conectar ao banco de dados:', error);
    }
  }

  initialize(server) {
    console.log('Iniciando o servidor...');
    server.listen(port, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
}

module.exports = { Server };
