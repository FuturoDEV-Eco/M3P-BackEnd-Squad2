const User = require('../../models/User');

class DeleteUserUseCase {
  async execute(userToDeleteId) {
    try {
      // Verificar se o usuário existe
      const user = await User.findOne({ where: { id: userToDeleteId } });
      if (!user) {
        return {
          status: 404,
          error: 'Usuário não encontrado // User not found',
        };
      }

      // Excluir o usuário
      await user.destroy();
      return {
        status: 200,
        message: 'Usuário excluído com sucesso // User successfully deleted',
      };
    } catch (error) {
      console.error('Erro interno do servidor:', error.message);
      return {
        status: 500,
        error: 'Erro interno do servidor // Internal Server Error',
      };
    }
  }
}

module.exports = DeleteUserUseCase;
