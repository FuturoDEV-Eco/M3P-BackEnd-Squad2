const CollectionPoint = require('../../models/CollectionPoint');

class CollectionCreateUseCase {
  async execute({
    name,
    description,
    recycle_types,
    postalcode,
    street,
    neighborhood,
    city,
    state,
    number,
    latitude,
    longitude,
    map_link,
    userId,
  }) {
    try {
      if (!latitude || !longitude) {
        throw new Error('Latitude e Longitude são obrigatórias.');
      }

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
