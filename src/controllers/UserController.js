const User = require('../models/User');
const CollectionPoint = require('../models/CollectionPoint');
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

  // Validar os dados da requisição
  const validationError = validateUserData(userData);
  if (validationError) {
    console.error('Validation Error:', validationError.message);
    return res
      .status(validationError.status)
      .json({ error: validationError.message });
  }

  try {
    // Verificar se o CPF já existe
    const cpfExists = await User.findOne({ where: { cpf: userData.cpf } });
    if (cpfExists) {
      console.error('CPF Already Exists:', userData.cpf);
      return res
        .status(409)
        .json({ error: 'CPF já existe // CPF already exists' });
    }

    // Verificar se o email já existe
    const emailExists = await User.findOne({
      where: { email: userData.email },
    });
    if (emailExists) {
      console.error('Email Already Exists:', userData.email);
      return res
        .status(409)
        .json({ error: 'Email já existe // Email already exists' });
    }

    // Criar o usuário
    const user = await User.create(userData);
    return res.status(201).json(user);
  } catch (error) {
    console.error('Internal Server Error:', error);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor // Internal Server Error' });
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

module.exports = {
  createUser,
  deleteUser,
};
