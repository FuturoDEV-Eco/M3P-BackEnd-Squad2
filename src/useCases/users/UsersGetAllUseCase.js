const { User } = require('../../models/User');

class UsersGetAllUseCase {
  async execute() {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password'], // Exclui o campo senha da resposta
        },
      });
      return users;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  }
}

module.exports = UsersGetAllUseCase;
