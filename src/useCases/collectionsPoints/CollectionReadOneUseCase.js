const { CollectionPoint, User } = require('../../models');

class CollectionReadOneUseCase {
  async execute(localId) {
    try {
      const collectionPoint = await CollectionPoint.findOne({
        where: {
          id: localId,
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name'],
          },
        ],
      });

      return collectionPoint;
    } catch (error) {
      throw new Error('Erro ao visualizar o ponto de coleta: ' + error.message);
    }
  }
}

module.exports = CollectionReadOneUseCase;
