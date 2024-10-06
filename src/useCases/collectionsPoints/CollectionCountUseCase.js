const CollectionPoint = require("../../models/CollectionPoint");

class CollectionCountUseCase {
  async execute() {
    try {
      const collectionCount = await CollectionPoint.count();
      return collectionCount;
    } catch (error) {
      throw new Error('Erro ao contar os pontos de coleta: ' + error.message);
    }
  }
}

module.exports = CollectionCountUseCase;
