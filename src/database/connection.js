const { Sequelize } = require('sequelize');
const config = require('../config/database.config');

// Inicializa a conexão com o Sequelize
const connection = new Sequelize(config);

// Função para sincronizar o banco de dados
async function syncDatabase() {
  try {
    await connection.sync({ force: true }); // 'force: true' recria todas as tabelas
    console.log('Tabelas recriadas com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
  }
}

module.exports = { connection, syncDatabase };
