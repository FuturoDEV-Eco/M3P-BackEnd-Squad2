const CollectionPoint = require('../../models/CollectionPoint');

class CollectionCreateUseCase {
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
    latitude, // Recebendo latitude
    longitude, // Recebendo longitude
    map_link, // Recebendo map_link
    userId // Recebendo user_id
  ) {
    try {
      const collectionPoint = await CollectionPoint.create({
        name: name,
        description: description,
        recycle_types: recycle_types,
        postalcode: postalcode.replace(/[^\d]+/g, ''),
        street: street,
        neighborhood: neighborhood,
        city: city,
        state: state,
        number: number,
        latitude: latitude,
        longitude: longitude,
        map_link: map_link,
        user_id: userId,
      });

      return collectionPoint;
    } catch (error) {
      throw new Error('Erro ao criar os pontos de coleta: ' + error.message);
    }
  }
}

module.exports = CollectionCreateUseCase;
