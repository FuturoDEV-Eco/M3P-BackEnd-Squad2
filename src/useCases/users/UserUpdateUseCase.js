const User = require('../../models/User');

class UserUpdateUseCase {
  async execute(userId, data, loggedUserId, isAdmin) {
    try {
      if (userId !== loggedUserId && !isAdmin) {
        throw {
          status: 403,
          message: 'Acesso negado // Access denied',
        };
      }

      const [updatedRowsCount] = await User.update(data, {
        where: { id: userId },
      });

      if (updatedRowsCount === 0) {
        throw {
          status: 404,
          message: 'Usuário não encontrado // User not found',
        };
      }

      const updatedUser = await User.findByPk(userId, {
        attributes: [
          'id',
          'name',
          'cpf',
          'gender',
          'birthdate',
          'email',
          'password',
          'postalcode',
          'street',
          'number',
          'complement',
          'neighborhood',
          'city',
          'state',
          'admin',
          'accent',
        ],
      });

      return updatedUser;
    } catch (error) {
      console.error('Error in UserUpdateUseCase:', error);
      throw {
        status: error.status || 500,
        message:
          error.message || 'Erro ao atualizar usuário // Error updating user',
      };
    }
  }
}

module.exports = UserUpdateUseCase;
