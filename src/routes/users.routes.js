const { Router } = require('express');
const UserController = require('../controllers/UserController');
const validateToken = require('../middlewares/validateToken');
const isAdminMiddleware = require('../middlewares/isAdmin');

const usersRoutes = new Router();

usersRoutes.get(
  '/count',
  UserController.countUsers
  /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para contar o número de usuários cadastrados.'
    #swagger.responses[200] = {
      description: 'Número de usuários retornado com sucesso.',
      schema: {
        count: 123
      }
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

usersRoutes.get(
  '/:id/count-collect-points',
  validateToken,
  UserController.countUserCollectionPoints
  /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para contar o número de pontos de coleta relacionados ao usuário.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do usuário',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Número de pontos de coleta retornado com sucesso.',
      schema: {
        collectionPointsCount: 5
      }
    }
    #swagger.responses[401] = {
      description: 'Usuário não autenticado.'
    }
    #swagger.responses[404] = {
      description: 'Usuário não encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

usersRoutes.post(
  '/criar',
  UserController.createUser
  /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para criar um usuário. Senha deve conter no mínimo 8 caracteres, incluindo maiúscula, minúscula e caractere especial. O CPF deve ser válido.'
    #swagger.parameters['criarUsuario'] = {
      in: 'body',
      description: 'Dados do usuário',
      required: true,
      schema: {
        $name: "Nelson Marcos Vinicius Oliveira",
        $cpf: "86288575917",
        $gender: "M",
        $email: "nelsonmarcosoliveira@kimmay.com.br",
        $password: "Teste123!",
        $birthdate: "1975-08-02",
        $postalcode: "88067108",
        $street: "Servidão Manoel Barbosa",
        $neighborhood: "Pântano do Sul",
        $city: "Florianópolis",
        $state: "SC",
        $number: "634",
        $admin: false,
        $aaccent: 1

      }
    }
    #swagger.responses[201] = {
      description: 'Usuário criado com sucesso.'
    }
    #swagger.responses[400] = {
      description: 'Dados inválidos fornecidos.'
    }
    #swagger.responses[409] = {
      description: 'CPF ou email já existem.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

usersRoutes.delete(
  '/:id',
  validateToken,
  UserController.deleteUser
  /* 
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para excluir um usuário pelo ID. A exclusão só será permitida se não houver pontos de coleta relacionados ao usuário. Além disso, um usuário só pode excluir sua própria conta.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do usuário',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Usuário excluído com sucesso.'
    }
    #swagger.responses[400] = {
      description: 'Usuário possui pontos de coleta relacionados e não pode ser excluído.'
    }
    #swagger.responses[403] = {
      description: 'Você somente pode excluir sua própria conta.'
    }
    #swagger.responses[404] = {
      description: 'Usuário não encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

usersRoutes.get(
  '/logged-user',
  validateToken,
  UserController.getLoggedUser
  /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para buscar dados do usuário logado.'
    #swagger.responses[200] = {
      description: 'Dados do usuário retornados com sucesso.',
      schema: {
        id: 1,
        name: 'Admin Teste',
        email: 'admin@admin.com'
      }
    }
    #swagger.responses[401] = {
      description: 'Usuário não autenticado.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

usersRoutes.put(
  '/logged-user',
  validateToken,
  UserController.updateLoggedUser
  /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para atualizar dados do usuário logado.'
    #swagger.parameters['updateUser'] = {
      in: 'body',
      description: 'Dados atualizados do usuário',
      required: true,
      schema: {
        $name: "Nome atualizado",
        $email: "emailatualizado@exemplo.com"
      }
    }
    #swagger.responses[200] = {
      description: 'Dados atualizados com sucesso.'
    }
    #swagger.responses[401] = {
      description: 'Usuário não autenticado.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

// Atualizar os próprios dados (usuário logado)
usersRoutes.put(
  '/logged-user',
  validateToken,
  UserController.updateLoggedUser
  /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para o usuário logado atualizar seus próprios dados.'
    #swagger.parameters['updateUser'] = {
      in: 'body',
      description: 'Dados atualizados do usuário',
      required: true,
      schema: {
        $name: "Nome atualizado",
        $email: "emailatualizado@exemplo.com"
      }
    }
    #swagger.responses[200] = {
      description: 'Dados atualizados com sucesso.'
    }
    #swagger.responses[401] = {
      description: 'Usuário não autenticado.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

// Atualizar os dados de qualquer usuário (administrador)
usersRoutes.put(
  '/:id',
  validateToken,
  isAdminMiddleware,
  UserController.updateUserById
  /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para o administrador atualizar os dados de qualquer usuário.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do usuário a ser atualizado.',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['updateUser'] = {
      in: 'body',
      description: 'Dados atualizados do usuário',
      required: true,
      schema: {
        $name: "Nome atualizado",
        $email: "emailatualizado@exemplo.com"
      }
    }
    #swagger.responses[200] = {
      description: 'Usuário atualizado com sucesso.'
    }
    #swagger.responses[401] = {
      description: 'Usuário não autenticado.'
    }
    #swagger.responses[403] = {
      description: 'Acesso negado. Apenas administradores podem acessar este recurso.'
    }
    #swagger.responses[404] = {
      description: 'Usuário não encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

usersRoutes.get(
  '/users-list-all',
  validateToken,
  isAdminMiddleware,
  UserController.getAllUsers
  /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para listar todos os usuários. Acesso restrito a administradores.'
    #swagger.responses[200] = {
      description: 'Lista de usuários retornada com sucesso.'
    }
    #swagger.responses[401] = {
      description: 'Usuário não autenticado.'
    }
    #swagger.responses[403] = {
      description: 'Acesso negado. Apenas administradores podem acessar este recurso.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

usersRoutes.get(
  '/:id',
  validateToken,
  UserController.getUserById
  /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para buscar usuário por ID. Acesso restrito a administradores.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do usuário',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Usuário retornado com sucesso.',
      schema: {
        id: 1,
        name: 'Admin Teste',
        email: 'admin@admin.com'
      }
    }
    #swagger.responses[401] = {
      description: 'Usuário não autenticado.'
    }
    #swagger.responses[403] = {
      description: 'Acesso negado. Apenas administradores podem acessar este recurso.'
    }
    #swagger.responses[404] = {
      description: 'Usuário não encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.'
    }
  */
);

module.exports = usersRoutes;
