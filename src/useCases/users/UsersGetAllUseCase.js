class UsersGetAllUseCase {
  async execute() {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password'], // Exclui o campo senha da resposta
        },
      });
      console.log('Usuários retornados do banco de dados:', users); // Adicionar log
      return users;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  }
}
