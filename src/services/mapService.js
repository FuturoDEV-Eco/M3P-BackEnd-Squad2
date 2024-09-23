const axios = require('axios');
const linkMapApi =
  'https://nominatim.openstreetmap.org/search?format=json&countrycodes=BR&limit=1';

async function getMapLocal(cep) {
  try {
    const response = await axios.get(`${linkMapApi}&postalcode=${cep}`);
    if (!response.data || response.data.length === 0) {
      console.error('Localização não encontrada');
      return { lat: null, lon: null, display_name: null };
    }
    const { lat, lon, display_name } = response.data[0];
    if (!lat || !lon || !display_name) {
      console.error('Localização não foi encontrada com esses dados');
      return { lat: null, lon: null, display_name: null };
    }
    return { lat, lon, display_name };
  } catch (error) {
    console.error('Erro ao chamar a API de mapas:', error.message);
    return { lat: null, lon: null, display_name: null };
  }
}

async function getGoogleMapsLink(local) {
  try {
    const { lat, lon } = local;
    if (lat && lon) {
      const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
      return googleMapsLink;
    }
    return null;
  } catch (error) {
    console.error('Erro ao gerar o link do Google Maps:', error.message);
    return null;
  }
}

module.exports = {
  getMapLocal,
  getGoogleMapsLink,
};
