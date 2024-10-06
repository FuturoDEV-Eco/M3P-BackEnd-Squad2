const {
  validateAddress,
  validateRecycleTypes,
  validateName,
  validateDescription,
} = require('../utils/validation');
const { getMapLocal, getGoogleMapsLink } = require('../services/mapService');
const CollectionReadUseCase = require('../useCases/collectionsPoints/CollectionReadUseCase');
const CollectionCreateUseCase = require('../useCases/collectionsPoints/CollectionCreateUseCase');
const CollectionReadOneUseCase = require('../useCases/collectionsPoints/CollectionReadOneUseCase');
const CollectionDeleteUseCase = require('../useCases/collectionsPoints/CollectionDeleteUseCase');
const CollectionUpdateUseCase = require('../useCases/collectionsPoints/CollectionUpdateUseCase');
const CollectionCountAllUseCase = require('../useCases/collectionsPoints/CollectionCountAllUseCase');
const CollectionListAllUseCase = require('../useCases/collectionsPoints/CollectionListAllUseCase');

const createCollectionPoint = async (req, res) => {
  const collectionUseCase = new CollectionCreateUseCase();

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
      latitude,
      longitude,
    } = req.body;

    const validationError = validateAddress(
      postalcode,
      street,
      neighborhood,
      city,
      state,
      number
    );
    if (validationError) {
      return res
        .status(validationError.status)
        .json({ error: validationError.message });
    }

    // Validate name
    const nameError = validateName(name);
    if (nameError) {
      return res.status(nameError.status).json({ error: nameError.message });
    }

    // Validate description
    const descriptionError = validateDescription(description);
    if (descriptionError) {
      return res
        .status(descriptionError.status)
        .json({ error: descriptionError.message });
    }

    // Validate recycle types
    const recycleTypesError = validateRecycleTypes(recycle_types);
    if (recycleTypesError) {
      return res
        .status(recycleTypesError.status)
        .json({ error: recycleTypesError.message });
    }

    // Get user ID from token
    const userId = req.userId;

    let lat = latitude || null;
    let lon = longitude || null;
    let map_link = null;

    if (!lat || !lon) {
      // Se latitude e longitude não forem enviadas, buscar via API
      const locationData = await getMapLocal(postalcode);
      if (locationData) {
        lat = locationData.lat;
        lon = locationData.lon;
        map_link = await getGoogleMapsLink(locationData);
      } else {
        console.error(
          'Não foi possível obter a localização do mapa: Erro ao chamar a API de mapas. Valores de Latitude, Longitude e Link para o mapa serão null'
        );
      }
    }

    const collectionCreate = await collectionUseCase.execute({
      name,
      description,
      recycle_types,
      postalcode,
      street,
      neighborhood,
      city,
      state,
      number,
      latitude: lat,
      longitude: lon,
      map_link,
      userId,
    });

    return res.status(201).json(collectionCreate);
  } catch (error) {
    console.error('Erro interno do servidor:', error);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
  }
};

const listUserCollectionPoints = async (req, res) => {
  const collectionUseCase = new CollectionReadUseCase();

  try {
    const userId = req.userId;

    const collectionRead = await collectionUseCase.execute(userId);

    if (!collectionRead[0]) {
      return res
        .status(404)
        .json({ mensagem: 'Nenhum ponto de coleta a ser exibido' });
    }

    return res.status(200).json(collectionRead);
  } catch (error) {
    console.error('Erro interno do servidor:', error);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
  }
};

const getCollectionPointById = async (req, res) => {
  const collectionUseCase = new CollectionReadOneUseCase();

  try {
    const localId = req.params.local_id;

    const collectionPoint = await collectionUseCase.execute(localId);

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
  const collectionUseCase = new CollectionDeleteUseCase();

  try {
    const userId = req.userId;
    const localId = req.params.local_id;

    const collectionPoint = await collectionUseCase.execute(userId, localId);

    if (!collectionPoint) {
      return res
        .status(404)
        .json({ error: 'Local não encontrado // Collection point not found' });
    }

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
  const collectionUseCase = new CollectionUpdateUseCase();

  try {
    const userId = req.userId;
    const localId = req.params.local_id; // Obter o localId do parâmetro da requisição

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
    if (validationError) {
      return res
        .status(validationError.status)
        .json({ error: validationError.message });
    }

    const nameError = validateName(name);
    if (nameError) {
      return res.status(nameError.status).json({ error: nameError.message });
    }

    const descriptionError = validateDescription(description);
    if (descriptionError) {
      return res
        .status(descriptionError.status)
        .json({ error: descriptionError.message });
    }

    const recycleTypesError = validateRecycleTypes(recycle_types);
    if (recycleTypesError) {
      return res
        .status(recycleTypesError.status)
        .json({ error: recycleTypesError.message });
    }

    // Chamar o use case para atualizar os dados
    const collectionUpdate = await collectionUseCase.execute(
      name,
      description,
      recycle_types,
      postalcode,
      street,
      neighborhood,
      city,
      state,
      number,
      postalcode, // ou uma variável para o oldPostalcode
      userId,
      localId
    );

    return res.status(200).json(collectionUpdate);
  } catch (error) {
    console.error('Erro interno do servidor:', error.message);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
  }
};

const countCollectionPoint = async (req, res) => {
  const collectionCountUseCase = new CollectionCountUseCase();

  try {
    const collectionCount = await collectionCountUseCase.execute();
    return res.status(200).json({ count: collectionCount });
  } catch (error) {
    console.error('Internal Server Error:', error.message);
    return res.status(500).json({
      error: 'Erro interno do servidor // Internal Server Error',
    });
  }
};
const countAllCollectionPoint = async (req, res) => {
  const collectionCountAllUseCase = new CollectionCountAllUseCase();

  try {
    const collectionCount = await collectionCountAllUseCase.execute();
    return res.status(200).json({ count: collectionCount });
  } catch (error) {
    console.error('Erro interno do servidor:', error.message);
    return res.status(500).json({
      error: 'Erro interno do servidor // Internal Server Error',
    });
  }
};

const listAllCollectionPoints = async (req, res) => {
  const collectionListAllUseCase = new CollectionListAllUseCase();

  try {
    const collectionPoints = await collectionListAllUseCase.execute();
    return res.status(200).json(collectionPoints);
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
  countCollectionPoint,
  countAllCollectionPoint,
  listAllCollectionPoints,
};
