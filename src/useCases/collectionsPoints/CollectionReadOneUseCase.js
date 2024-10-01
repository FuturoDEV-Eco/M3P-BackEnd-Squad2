const CollectionPoint = require("../../models/CollectionPoint");


class CollectionReadOneUseCase  {
    async execute(userId, localId){

        try{
            const collectionPoints = await CollectionPoint.findOne({
                where: {
                  id: localId,
                  user_id: userId,
                },
              });
            return collectionPoints;
        }catch(error){
            throw new Error('Erro ao visualizar os pontos de coleta: ' + error.message);
        }
    }
}

module.exports = CollectionReadOneUseCase