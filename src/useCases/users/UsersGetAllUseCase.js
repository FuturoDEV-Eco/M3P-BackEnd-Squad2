const { User, CollectionPoint } = require('../../models');

class UsersGetAllUseCase {
  async execute() {
    try {
      console.log(
        'Iniciando a consulta para listar todos os usuários e seus pontos de coleta...'
      );

      // Consulta para pegar todos os usuários e incluir os pontos de coleta associados
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
            model: CollectionPoint, // Inclui o relacionamento com pontos de coleta
            as: 'collectionPoints', // Certifique-se que o alias é o mesmo definido no relacionamento
            attributes: ['id', 'name', 'description', 'latitude', 'longitude'], // Campos que deseja trazer de CollectionPoint
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
      ); // Log dos usuários e seus pontos de coleta
      return users;
    } catch (error) {
      console.error('Erro ao listar usuários e pontos de coleta:', error);
      throw new Error('Erro ao consultar usuários no banco de dados');
    }
  }
}

module.exports = UsersGetAllUseCase;
