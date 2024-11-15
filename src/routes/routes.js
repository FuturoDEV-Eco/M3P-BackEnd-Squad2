const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');
const LoginController = require('../controllers/LoginController');
const usersRoutes = require('./users.routes');
const collectionPointsRoutes = require('./collectionPoints.routes');
const serverRoutes = require('./server.routes');

const validateToken = require('../middlewares/validateToken');

const routes = Router();

routes.use('/server', serverRoutes); // Adicionando a rota de status do servidor

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.post(
  '/login',
  LoginController.login
  /*
    #swagger.tags = ['Login']
    #swagger.description = 'Endpoint para logar um usuário e criar um token para acesso. <br><br> <b>Importante:</b> Para utilizar as rotas protegidas no Swagger, adicione <code>Bearer &lt;token&gt;</code> no campo de autorização.'
    #swagger.parameters['loginUsuario'] = {
        in: 'body',
        description: 'Login do usuário',
        required: true,
        schema: { 
            $email: "raquelninacosta@kof.com.mx",
            $password: "Teste123!"
        }
    }
    #swagger.responses[200] = {
      description: 'Login bem-sucedido, token gerado com sucesso.',
      schema: {
        type: 'object',
        properties: {
          token: { type: 'string', description: 'Token JWT gerado para o usuário.' },
          id: { type: 'integer', description: 'ID do usuário.' },
          name: { type: 'string', description: 'Nome do usuário.' }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Email e senha são obrigatórios.'
    }
    #swagger.responses[404] = {
      description: 'Usuário não encontrado ou senha incorreta.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

routes.use('/usuarios', usersRoutes);
routes.use('/local', collectionPointsRoutes);

module.exports = routes;
