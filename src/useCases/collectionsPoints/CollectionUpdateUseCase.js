const CollectionPoint = require("../../models/CollectionPoint");

class CollectionUpdateUseCase {
  async execute(
    name,
    description,
    recycle_types,
    postalcode,
    street,
    neighborhood,
    city,
    state,
    number,
    oldPostalcode,
    userId,        // Recebendo user_id
    localId,
  ) {
    try {
      const collectionPoint = await CollectionPoint.findOne({
        where: {
          id: localId,
          user_id: userId,
        },
      });

      if (!collectionPoint) {
        return "Ponto de coleta não localizado"
    }
      // Atualizar os dados
      collectionPoint.name = name;
      collectionPoint.description = description;
      collectionPoint.recycle_types = recycle_types;
      collectionPoint.postalcode = postalcode.replace(/[^\d]+/g, ''); // Remover não dígitos
      collectionPoint.street = street;
      collectionPoint.neighborhood = neighborhood;
      collectionPoint.city = city;
      collectionPoint.state = state;
      collectionPoint.number = number;

      // Verificar se o postalcode foi alterado
      if (oldPostalcode !== postalcode) {
        const locationData = await getMapLocal(collectionPoint.postalcode);
        collectionPoint.latitude = locationData.lat;
        collectionPoint.longitude = locationData.lon;
        collectionPoint.map_link = await getGoogleMapsLink(locationData);
      }

      await collectionPoint.save();

      return collectionPoint;

    } catch (error) {
      throw new Error('Erro ao atualizar os pontos de coleta: ' + error.message);
    }
  }
}

module.exports = CollectionUpdateUseCase;
