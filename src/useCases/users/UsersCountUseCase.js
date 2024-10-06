const User = require('../../models/User');

class UsersCountUseCase {
  async execute() {
    try {
      const userCount = await User.count();
      return userCount;
    } catch (error) {
      throw new Error('Erro ao contar usuários: ' + error.message);
    }
  }
}

module.exports = UsersCountUseCase;
