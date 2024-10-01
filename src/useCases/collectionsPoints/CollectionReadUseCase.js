const CollectionPoint = require("../../models/CollectionPoint");


class CollectionReadUseCase  {
    async execute(userId){

        try{
            const collectionPoints = await CollectionPoint.findAll({
              where: { user_id: userId },
            });
            return collectionPoints;
        }catch(error){
            throw new Error('Erro ao visualizar os pontos de coleta: ' + error.message);
        }
    }
}

module.exports = CollectionReadUseCase