const User = require('../models/User');
const CollectionPoint = require('../models/CollectionPoint');

const UsersCountUseCase = require('../useCases/users/UsersCountUseCase');
const UserCreateUseCase = require('../useCases/users/UserCreateUseCase');
const UserGetLoggedUserUseCase = require('../useCases/users/UserGetLoggedUserUseCase');
const UserUpdateUseCase = require('../useCases/users/UserUpdateUseCase');
const UserGetByIdUseCase = require('../useCases/users/UserGetByIdUseCase');
const UsersGetAllUseCase = require('../useCases/users/UsersGetAllUseCase');
const DeleteUserUseCase = require('../useCases/users/UseDeleteUseCase.js');
const UserCountCollectPointsUseCase = require('../useCases/users/UserCountCollectPointsUseCase');

const {
  validateCPF,
  validateName,
  validateGender,
  validateEmail,
  validatePassword,
  validateBirthdate,
  validateAddress,
} = require('../utils/validation');

function validateUserData(data) {
  let validationError;

  validationError = validateName(data.name);
  if (validationError) return validationError;

  data.cpf = data.cpf.replace(/[^\d]+/g, '');
  validationError = validateCPF(data.cpf);
  if (validationError) return validationError;

  validationError = validateGender(data.gender);
  if (validationError) return validationError;

  validationError = validateEmail(data.email);
  if (validationError) return validationError;

  validationError = validatePassword(data.password);
  if (validationError) return validationError;

  validationError = validateBirthdate(data.birthdate);
  if (validationError) return validationError;

  data.postalcode = data.postalcode.replace(/[^\d]+/g, '');
  validationError = validateAddress(
    data.postalcode,
    data.street,
    data.neighborhood,
    data.city,
    data.state,
    data.number
  );
  if (validationError) return validationError;

  return null;
}

const createUser = async (req, res) => {
  const userData = req.body;
  const userCreateUseCase = new UserCreateUseCase();

  try {
    const user = await userCreateUseCase.execute(userData);
    return res.status(201).json(user);
  } catch (error) {
    console.error('Error in createUser:', error);
    const status = error.status || 500;
    const message =
      error.message || 'Erro interno do servidor // Internal Server Error';
    return res.status(status).json({ error: message });
  }
};

const getUserById = async (req, res) => {
  const userGetByIdUseCase = new UserGetByIdUseCase();
  try {
    const user = await userGetByIdUseCase.execute(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ mensagem: 'Usuário não encontrado // User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res
      .status(error.status || 500)
      .json({ mensagem: error.message || 'Erro interno do servidor' });
  }
};

const updateLoggedUser = async (req, res) => {
  const userUpdateUseCase = new UserUpdateUseCase();
  try {
    const updatedUser = await userUpdateUseCase.execute(
      req.userId,
      req.body,
      req.userId,
      req.admin
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

const updateUserById = async (req, res) => {
  const userUpdateUseCase = new UserUpdateUseCase();
  try {
    const updatedUser = await userUpdateUseCase.execute(
      req.params.id,
      req.body,
      req.userId,
      req.admin
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.userId; //
    const userToDeleteId = req.params.id;

    // Verifica se o usuário está tentando deletar sua própria conta
    if (userId !== parseInt(userToDeleteId)) {
      return res
        .status(403)
        .json({ error: 'Você somente pode excluir sua própria conta.' });
    }

    // Verifica se o usuário tem pontos de coleta
    const userCountCollectPointsUseCase = new UserCountCollectPointsUseCase();
    const collectionPointsCount = await userCountCollectPointsUseCase.execute(
      userToDeleteId
    );

    if (collectionPointsCount > 0) {
      return res.status(400).json({
        error:
          'Usuário possui pontos de coleta relacionados e não pode ser excluído.',
      });
    }

    // Se não houver pontos de coleta, chama o use case para deletar o usuário
    const deleteUserUseCase = new DeleteUserUseCase();
    const result = await deleteUserUseCase.execute(userId, userToDeleteId);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error('Internal Server Error:', error.message);
    return res.status(500).json({
      error: 'Erro interno do servidor // Internal Server Error',
    });
  }
};

const countUsers = async (req, res) => {
  const usersCountUseCase = new UsersCountUseCase();

  try {
    const userCount = await usersCountUseCase.execute();
    return res.status(200).json({ count: userCount });
  } catch (error) {
    console.error('Internal Server Error:', error.message);
    return res.status(500).json({
      error: 'Erro interno do servidor // Internal Server Error',
    });
  }
};

const getLoggedUser = async (req, res) => {
  const userGetLoggedUserUseCase = new UserGetLoggedUserUseCase();
  try {
    const user = await userGetLoggedUserUseCase.execute(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ mensagem: 'Usuário não encontrado // User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res
      .status(500)
      .json({ mensagem: 'Erro interno do servidor // Internal Server Error' });
  }
};

o;

const getAllUsers = async (req, res) => {
  const usersGetAllUseCase = new UsersGetAllUseCase();

  try {
    const users = await usersGetAllUseCase.execute();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
const countUserCollectionPoints = async (req, res) => {
  const { id } = req.params;
  const userCountCollectPointsUseCase = new UserCountCollectPointsUseCase();

  try {
    const count = await userCountCollectPointsUseCase.execute(id);
    return res.status(200).json({ count });
  } catch (error) {
    console.error('Erro ao contar pontos de coleta:', error.message);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  createUser,
  updateLoggedUser,
  updateUserById,
  deleteUser,
  countUsers,
  getLoggedUser,
  getUserById,
  getAllUsers,
  countUserCollectionPoints,
};
