const { CollectionPoint, User } = require('../../models');

class CollectionListAllUseCase {
  async execute() {
    try {
      const collectionPoints = await CollectionPoint.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name'], // Inclua outros atributos se necessário
          },
        ],
      });
      return collectionPoints;
    } catch (error) {
      throw new Error('Erro ao listar os pontos de coleta: ' + error.message);
    }
  }
}

module.exports = CollectionListAllUseCase;
