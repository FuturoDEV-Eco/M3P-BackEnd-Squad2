const { User, CollectionPoint } = require('../../models');

class UsersGetAllUseCase {
  async execute() {
    try {
      console.log(
        'Iniciando a consulta para listar todos os usuários e seus pontos de coleta...'
      );

      const users = await User.findAll({
        attributes: [
          'id',
          'name',
          'cpf',
          'gender',
          'postalcode',
          'street',
          'neighborhood',
          'city',
          'state',
          'number',
          'complement',
          'email',
          'birthdate',
          'admin',
          'accent',
          'createdAt',
          'updatedAt',
        ],
        include: [
          {
            model: CollectionPoint,
            as: 'collectionPoints',
            attributes: ['id', 'name', 'description', 'latitude', 'longitude'],
          },
        ],
      });

      if (!users || users.length === 0) {
        console.log('Nenhum usuário encontrado no banco de dados.');
        return [];
      }

      console.log(
        'Usuários e pontos de coleta retornados do banco de dados:',
        users
      );
      return users;
    } catch (error) {
      console.error('Erro ao listar usuários e pontos de coleta:', error);
      throw new Error('Erro ao consultar usuários no banco de dados');
    }
  }
}

module.exports = UsersGetAllUseCase;
