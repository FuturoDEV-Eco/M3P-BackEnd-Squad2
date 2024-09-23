const CollectionPoint = require('../models/CollectionPoint');
const {
  validateAddress,
  validateRecycleTypes,
  validateName,
  validateDescription,
} = require('../utils/validation');
const { getMapLocal, getGoogleMapsLink } = require('../services/mapService');

const createCollectionPoint = async (req, res) => {
  try {
    const {
      name,
      description,
      recycle_types,
      postalcode,
      street,
      neighborhood,
      city,
      state,
      number,
    } = req.body;

    // Validate address
    const validationError = validateAddress(
      postalcode,
      street,
      neighborhood,
      city,
      state,
      number
    );
    if (validationError)
      return res
        .status(validationError.status)
        .json({ error: validationError.message });

    // Validate name
    const nameError = validateName(name);
    if (nameError)
      return res.status(nameError.status).json({ error: nameError.message });

    // Validate description
    const descriptionError = validateDescription(description);
    if (descriptionError)
      return res
        .status(descriptionError.status)
        .json({ error: descriptionError.message });

    // Validate recycle types
    const recycleTypesError = validateRecycleTypes(recycle_types);
    if (recycleTypesError)
      return res
        .status(recycleTypesError.status)
        .json({ error: recycleTypesError.message });

    // Get user ID from token
    const userId = req.userId;

    // Fetch location data
    const locationData = await getMapLocal(postalcode);
    let latitude = null;
    let longitude = null;
    let map_link = null;
    if (locationData) {
      latitude = locationData.lat;
      longitude = locationData.lon;
      map_link = await getGoogleMapsLink(locationData);
    } else {
      console.error(
        'Não foi possível obter a localização do mapa: Erro ao chamar a API de mapas. Valores de Latitude, Longitude e Link para o mapa serão null // Impossible to get location data. Latitude, Longitude and Map Link are null'
      );
    }

    // Create collection point
    const collectionPoint = await CollectionPoint.create({
      name,
      description,
      recycle_types,
      postalcode: postalcode.replace(/[^\d]+/g, ''),
      street,
      neighborhood,
      city,
      state,
      number,
      latitude,
      longitude,
      map_link,
      user_id: userId,
    });

    return res.status(201).json(collectionPoint);
  } catch (error) {
    console.error('Internal Server Error:', error.message); // Log the error message
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
  }
};
const listUserCollectionPoints = async (req, res) => {
  try {
    const userId = req.userId;
    const collectionPoints = await CollectionPoint.findAll({
      where: { user_id: userId },
    });
    return res.status(200).json(collectionPoints);
  } catch (error) {
    console.error('Erro interno do servidor:', error);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
  }
};

const getCollectionPointById = async (req, res) => {
  try {
    const userId = req.userId;
    const localId = req.params.local_id;

    const collectionPoint = await CollectionPoint.findOne({
      where: {
        id: localId,
        user_id: userId,
      },
    });

    if (!collectionPoint) {
      return res
        .status(404)
        .json({ error: 'Local não encontrado // Collection point not found' });
    }

    return res.status(200).json(collectionPoint);
  } catch (error) {
    console.error('Erro interno do servidor:', error.message);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
  }
};

const deleteCollectionPoint = async (req, res) => {
  try {
    const userId = req.userId;
    const localId = req.params.local_id;

    const collectionPoint = await CollectionPoint.findOne({
      where: {
        id: localId,
        user_id: userId,
      },
    });

    if (!collectionPoint) {
      return res
        .status(404)
        .json({ error: 'Local não encontrado // Collection point not found' });
    }

    await collectionPoint.destroy();
    return res.status(200).json({
      message:
        'Local excluído com sucesso // Collection point successfully deleted',
    });
  } catch (error) {
    console.error('Erro interno do servidor:', error.message);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
  }
};

const updateCollectionPoint = async (req, res) => {
  try {
    const userId = req.userId;
    const localId = req.params.local_id;
    const {
      name,
      description,
      recycle_types,
      postalcode,
      street,
      neighborhood,
      city,
      state,
      number,
    } = req.body;

    // Validar endereço
    const validationError = validateAddress(
      postalcode,
      street,
      neighborhood,
      city,
      state,
      number
    );
    if (validationError)
      return res
        .status(validationError.status)
        .json({ error: validationError.message });

    const nameError = validateName(name);
    if (nameError)
      return res.status(nameError.status).json({ error: nameError.message });

    const descriptionError = validateDescription(description);
    if (descriptionError)
      return res
        .status(descriptionError.status)
        .json({ error: descriptionError.message });

    const recycleTypesError = validateRecycleTypes(recycle_types);
    if (recycleTypesError)
      return res
        .status(recycleTypesError.status)
        .json({ error: recycleTypesError.message });

    const collectionPoint = await CollectionPoint.findOne({
      where: {
        id: localId,
        user_id: userId,
      },
    });

    if (!collectionPoint) {
      return res
        .status(404)
        .json({ error: 'Local não encontrado // Collection point not found' });
    }

    // Atualizar ponto de coleta
    collectionPoint.name = name;
    collectionPoint.description = description;
    collectionPoint.recycle_types = recycle_types;
    const oldPostalcode = collectionPoint.postalcode;
    collectionPoint.postalcode = postalcode.replace(/[^\d]+/g, '');
    collectionPoint.street = street;
    collectionPoint.neighborhood = neighborhood;
    collectionPoint.city = city;
    collectionPoint.state = state;
    collectionPoint.number = number;

    // Buscar dados de localização se o CEP tiver sido alterado
    if (oldPostalcode !== collectionPoint.postalcode) {
      const locationData = await getMapLocal(collectionPoint.postalcode);
      collectionPoint.latitude = locationData.lat;
      collectionPoint.longitude = locationData.lon;
      collectionPoint.map_link = await getGoogleMapsLink(locationData);
    }

    await collectionPoint.save();
    return res.status(200).json(collectionPoint);
  } catch (error) {
    console.error('Erro interno do servidor:', error.message);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
  }
};

const getCollectionPointMapLink = async (req, res) => {
  try {
    const userId = req.userId;
    const localId = req.params.local_id;

    const collectionPoint = await CollectionPoint.findOne({
      where: {
        id: localId,
        user_id: userId,
      },
    });

    if (!collectionPoint) {
      return res
        .status(404)
        .json({ error: 'Local não encontrado // Collection point not found' });
    }

    if (!collectionPoint.map_link) {
      const locationData = await getMapLocal(collectionPoint.postalcode);
      collectionPoint.latitude = locationData.lat;
      collectionPoint.longitude = locationData.lon;
      collectionPoint.map_link = await getGoogleMapsLink(locationData);
      await collectionPoint.save();
    }

    if (!collectionPoint.map_link) {
      return res.status(404).json({
        error:
          'O CEP não foi encontrado, então o link para o Google Maps é nulo // The postal code was not found, so the Google Maps link is null',
      });
    }

    return res.status(200).json({ map_link: collectionPoint.map_link });
  } catch (error) {
    console.error('Erro interno do servidor:', error.message);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
  }
};

module.exports = {
  createCollectionPoint,
  listUserCollectionPoints,
  getCollectionPointById,
  deleteCollectionPoint,
  updateCollectionPoint,
  getCollectionPointMapLink,
};
