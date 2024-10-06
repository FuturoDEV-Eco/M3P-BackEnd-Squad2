const User = require('../../models/User');

class UserGetByIdUseCase {
  async execute(userId) {
    try {
      const user = await User.findByPk(userId, {
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

      return user;
    } catch (error) {
      console.error('Error in UserGetByIdUseCase:', error);
      throw {
        status: 500,
        message: 'Erro ao obter usuário // Error fetching user',
      };
    }
  }
}

module.exports = UserGetByIdUseCase;
