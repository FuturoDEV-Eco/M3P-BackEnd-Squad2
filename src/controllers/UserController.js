const User = require('../models/User');
const CollectionPoint = require('../models/CollectionPoint');

const UsersCountUseCase = require('../useCases/users/UsersCountUseCase');
const UserCreateUseCase = require('../useCases/users/UserCreateUseCase');
const UserGetLoggedUserUseCase = require('../useCases/users/UserGetLoggedUserUseCase');

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

  // Remover caracteres não numéricos do CPF antes da validação
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

  data.postalcode = data.postalcode.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos do CEP
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

const deleteUser = async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado
    const userToDeleteId = req.params.id; // Obtém o ID do usuário a ser deletado

    // Verificar se o usuário autenticado está tentando deletar sua própria conta
    if (userId !== parseInt(userToDeleteId)) {
      return res.status(403).json({
        error:
          'Você somente pode excluir sua própria conta // You can only delete your own account',
      });
    }

    // Verificar se o usuário possui pontos de coleta registrados
    const collectionPoints = await CollectionPoint.findOne({
      where: { user_id: userId },
    });
    if (collectionPoints) {
      return res.status(400).json({
        error:
          'Usuário possui pontos de coleta relacionados e não pode ser excluído // User has related collection points and cannot be deleted',
      });
    }

    // Verificar se o usuário existe
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res
        .status(404)
        .json({ error: 'Usuário não encontrado // User not found' });
    }

    // Excluir o usuário
    await user.destroy();
    return res.status(200).json({
      message: 'Usuário excluído com sucesso // User successfully deleted',
    });
  } catch (error) {
    console.error('Internal Server Error:', error.message);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
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

module.exports = {
  createUser,
  deleteUser,
  countUsers,
  getLoggedUser,
};
