const { Router } = require('express');
const CollectionPointController = require('../controllers/CollectionPointController');
const validateToken = require('../middlewares/validateToken');
const isAdminMiddleware = require('../middlewares/isAdmin');

const collectionPointsRoutes = new Router();

collectionPointsRoutes.get(
  '/count-all',
  CollectionPointController.countAllCollectionPoint
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para obter a contagem total de pontos de coleta.'
    #swagger.responses[200] = {
      description: 'Contagem de pontos de coleta retornada com sucesso.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

collectionPointsRoutes.get(
  '/all',
  CollectionPointController.listAllCollectionPoints
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para listar todos os pontos de coleta disponíveis no sistema.'
    #swagger.responses[200] = {
      description: 'Lista de pontos de coleta retornada com sucesso.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

collectionPointsRoutes.post(
  '/',
  validateToken,
  CollectionPointController.createCollectionPoint
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para criar um ponto de coleta. Somente usuários autenticados podem criar um ponto de coleta e o ponto de coleta será veiculado ao usuário autenticado. Todos os campos são obrigatórios. Caso o CEP não seja encontrado na nominatim.openstreetmap, as colunas latitude, longitude e map_link serão preenchidas com null. Se tudo der certo, o sistema retornará status 201 com as informações do novo ponto de coleta. Se houver erro, o sistema retornará status 500 com a mensagem: Erro interno do servidor // Internal Server Error e o erro será exibido no console.'
    #swagger.parameters['criarPontoDeColeta'] = {
        in: 'body',
        description: 'Dados do ponto de coleta',
        required: true,
        schema: {
              $name: "Ponto Dakir Polidoro",
              $description: "Este é um ponto de coleta da comcap para recolhimento de vidros",
              $recycle_types: "Vidro, Papel, Plástico",
              $postalcode: "88063-565",
              $street: "Rua Radialista Dakir Polidoro",
              $neighborhood: "Campeche",
              $city: "Florianópolis",
              $state: "SC",
              $number: "123"
          }
    }
    #swagger.responses[201] = {
      description: 'Ponto de coleta criado com sucesso.'
    }
    #swagger.responses[400] = {
      description: 'Dados inválidos fornecidos.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

collectionPointsRoutes.get(
  '/',
  validateToken,
  CollectionPointController.listUserCollectionPoints
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para listar todos os pontos de coleta cadastrados pelo usuário autenticado. No momento do login, o id do usuário é armazenado no token. O endpoint usará esse id para garantir que apenas o usuário veja os pontos de coleta que ele criou.'
    #swagger.responses[200] = {
      description: 'Lista de pontos de coleta retornada com sucesso.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

collectionPointsRoutes.get(
  '/:local_id',
  validateToken,
  CollectionPointController.getCollectionPointById
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para obter detalhes de um ponto de coleta específico. O local é identificado pelo ID passado como parâmetro na URL. 
    A autenticação é necessária para acessar este endpoint.'
    #swagger.parameters['local_id'] = {
      in: 'path',
      description: 'ID do ponto de coleta',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Detalhes do ponto de coleta retornados com sucesso.',
      schema: {
        id: 1,
        name: 'Ponto Dakir Polidoro',
        description: 'Ponto de coleta para reciclagem de vidro e plástico.',
        recycle_types: 'Vidro, Plástico',
        postalcode: '88063-565',
        street: 'Rua Radialista Dakir Polidoro',
        neighborhood: 'Campeche',
        city: 'Florianópolis',
        state: 'SC',
        number: '123',
        latitude: '-27.605',
        longitude: '-48.453',
        map_link: 'https://www.google.com/maps?q=-27.605,-48.453',
        user: {
          name: 'Admin Teste'
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Ponto de coleta não encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

collectionPointsRoutes.delete(
  '/:local_id',
  validateToken,
  CollectionPointController.deleteCollectionPoint
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para excluir um ponto de coleta específico cadastrado pelo usuário autenticado. No momento do login, o id do usuário é armazenado no token. O endpoint usará esse id para garantir que apenas o usuário autenticado que criou o ponto de coleta tenha acesso a essas informações.'
    #swagger.parameters['local_id'] = {
        in: 'path',
        description: 'ID do ponto de coleta',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Ponto de coleta excluído com sucesso.'
    }
    #swagger.responses[404] = {
      description: 'Ponto de coleta não encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

collectionPointsRoutes.put(
  '/:local_id',
  validateToken,
  CollectionPointController.updateCollectionPoint
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para atualizar informações de um ponto de coleta específico cadastrado pelo usuário autenticado. No momento do login, o id do usuário é armazenado no token. O endpoint usará esse id para garantir que apenas o usuário autenticado que criou o ponto de coleta possa alterá-lo. Todos os campos são obrigatórios. Caso o CEP não seja encontrado na nominatim.openstreetmap, as colunas latitude, longitude e map_link serão preenchidas com null. Se tudo der certo, o sistema retornará status 200 com as informações do ponto de coleta atualizado. Se houver erro, o sistema retornará status 500 com a mensagem: Erro interno do servidor // Internal Server Error e o erro será exibido no console.'
    #swagger.parameters['local_id'] = {
        in: 'path',
        description: 'ID do ponto de coleta',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['atualizarPontoDeColeta'] = {
        in: 'body',
        description: 'Dados atualizados do ponto de coleta',
        required: true,
        schema: {
            $name: "Ponto Dakir Polidoro Atualizado",
            $description: "Descrição atualizada do ponto de coleta",
            $recycle_types: "Vidro, Papel, Plástico",
            $postalcode: "88063-565",
            $street: "Rua Radialista Dakir Polidoro",
            $neighborhood: "Campeche",
            $city: "Florianópolis",
            $state: "SC",
            $number: "123"
        }
    }
    #swagger.responses[200] = {
      description: 'Ponto de coleta atualizado com sucesso.'
    }
    #swagger.responses[404] = {
      description: 'Ponto de coleta não encontrado.'
    }
    #swagger.responses[400] = {
      description: 'Dados inválidos fornecidos.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

module.exports = collectionPointsRoutes;
