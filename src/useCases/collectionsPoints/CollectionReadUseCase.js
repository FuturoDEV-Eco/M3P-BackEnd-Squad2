const CollectionPoint = require("../../models/CollectionPoint");


class CollectionReadUseCase  {
    async execute(){

        try{
            const userId = req.userId;
            const collectionPoints = await CollectionPoint.findAll({
              where: { user_id: userId },
            });
            return res.status(200).json(collectionPoints);
        }catch(error){
            throw new Error('Erro ao contar os pontos de coleta: ' + error.message);
        }
    }
}

module.exports = CollectionReadUseCase