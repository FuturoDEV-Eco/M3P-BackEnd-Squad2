const CollectionPoint = require('../../models/CollectionPoint');

class UserCheckCollectionPointsUseCase {
  async execute(userId) {
    try {
      // Verificar se o usuário possui pontos de coleta
      const collectionPoints = await CollectionPoint.findOne({
        where: { user_id: userId },
      });

      if (collectionPoints) {
        return { hasCollectionPoints: true };
      } else {
        return { hasCollectionPoints: false };
      }
    } catch (error) {
      throw new Error('Erro ao verificar pontos de coleta: ' + error.message);
    }
  }
}

module.exports = UserCheckCollectionPointsUseCase;
