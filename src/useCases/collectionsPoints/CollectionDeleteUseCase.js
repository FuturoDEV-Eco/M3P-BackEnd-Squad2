const CollectionPoint = require("../../models/CollectionPoint");


class CollectionDeleteUseCase  {
    async execute(userId, localId){

        try{
            const collectionPoints = await CollectionPoint.findOne({
                where: {
                  id: localId,
                  user_id: userId,
                },
              });

              await collectionPoints.destroy()

            return collectionPoints;
        }catch(error){
            throw new Error('Erro ao excluir o ponto de coleta: ' + error.message);
        }
    }
}

module.exports = CollectionDeleteUseCase