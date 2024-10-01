const User = require('../models/User');
const {
  validateCPF,
  validateName,
  validateGender,
  validateEmail,
  validatePassword,
  validateBirthdate,
  validateAddress,
} = require('../utils/validation');

class UserCreateUseCase {
  async execute(userData) {
    // Validar os dados do usuário
    const validationError = this.validateUserData(userData);
    if (validationError) {
      console.error('Validation Error:', validationError.message);
      throw {
        status: validationError.status,
        message: validationError.message,
      };
    }

    try {
      // Verificar se o CPF já existe
      const cpfExists = await User.findOne({ where: { cpf: userData.cpf } });
      if (cpfExists) {
        console.error('CPF Already Exists:', userData.cpf);
        throw { status: 409, message: 'CPF já existe // CPF already exists' };
      }

      // Verificar se o email já existe
      const emailExists = await User.findOne({
        where: { email: userData.email },
      });
      if (emailExists) {
        console.error('Email Already Exists:', userData.email);
        throw {
          status: 409,
          message: 'Email já existe // Email already exists',
        };
      }

      // Criar o usuário
      const user = await User.create(userData);
      return user;
    } catch (error) {
      console.error('Error in UserCreateUseCase:', error);
      if (error.status && error.message) {
        throw error; // Re-lança erros conhecidos
      } else {
        throw {
          status: 500,
          message: 'Erro interno do servidor // Internal Server Error',
        };
      }
    }
  }

  validateUserData(data) {
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
}

module.exports = UserCreateUseCase;
