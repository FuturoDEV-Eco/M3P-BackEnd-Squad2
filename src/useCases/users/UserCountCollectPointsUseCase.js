const CollectionPoint = require('../../models/CollectionPoint');

class UserCountCollectPointsUseCase {
  async execute(userId) {
    try {
      // Conta os pontos de coleta do usuário com base no user_id
      const collectionPointsCount = await CollectionPoint.count({
        where: { user_id: userId }, // Filtra pelo ID do usuário
      });
      return collectionPointsCount;
    } catch (error) {
      throw new Error('Erro ao contar pontos de coleta: ' + error.message);
    }
  }
}

module.exports = UserCountCollectPointsUseCase;
