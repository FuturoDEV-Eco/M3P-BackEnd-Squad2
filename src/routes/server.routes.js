const { Router } = require('express');
const ServerController = require('../controllers/ServerController');

const serverRoutes = Router();

serverRoutes.get('/status', ServerController.status);

module.exports = serverRoutes;
