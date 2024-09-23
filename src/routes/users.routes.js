const { Router } = require('express');
const UserController = require('../controllers/UserController');
const validateToken = require('../middlewares/validateToken');

const usersRoutes = new Router();

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
            $number: "634"
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
          description: 'Usuário excluído com sucesso'
        }
        #swagger.responses[400] = {
          description: 'Usuário possui pontos de coleta relacionados e não pode ser excluído'
        }
        #swagger.responses[403] = {
          description: 'Você somente pode excluir sua própria conta'
        }
        #swagger.responses[404] = {
          description: 'Usuário não encontrado'
        }
        #swagger.responses[500] = {
          description: 'Erro interno do servidor'
        }
    */
);

module.exports = usersRoutes;
