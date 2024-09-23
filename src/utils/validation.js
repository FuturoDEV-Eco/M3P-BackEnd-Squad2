const validateCPF = (cpf) => {
  console.log('Validating CPF:', cpf); // Log do CPF original
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  console.log('Formatted CPF:', cpf); // Log do CPF formatado
  if (cpf.length !== 11) {
    console.log('Invalid CPF length');
    return { status: 400, message: 'CPF inválido // Invalid CPF' };
  }

  // Elimina CPFs inválidos conhecidos
  if (/^(\d)\1{10}$/.test(cpf)) {
    console.log('Invalid known CPF');
    return { status: 400, message: 'CPF inválido // Invalid CPF' };
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let checkDigit = 11 - (sum % 11);
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
  if (checkDigit !== parseInt(cpf.charAt(9))) {
    console.log('First check digit validation failed');
    return { status: 400, message: 'CPF inválido // Invalid CPF' };
  }

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  checkDigit = 11 - (sum % 11);
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
  if (checkDigit !== parseInt(cpf.charAt(10))) {
    console.log('Second check digit validation failed');
    return { status: 400, message: 'CPF inválido // Invalid CPF' };
  }

  return null;
};



const validateName = (name) => {
  if (!name || name.trim() === '') {
    return { status: 400, message: 'Nome é obrigatório // Name is required' };
  }
  return null;
};

const validateGender = (gender) => {
  if (!['M', 'F', 'O'].includes(gender)) {
    return { status: 400, message: 'Gênero deve ser M, F ou O // Gender must be M, F, or O' };
  }
  return null;
};

const validateEmail = (email) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, message: 'Email inválido // Invalid email' };
  }
  return null;
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    return { status: 400, message: 'Senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um símbolo // Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, and one symbol' };
  }
  return null;
};

const validateBirthdate = (birthdate) => {
  if (!birthdate || isNaN(Date.parse(birthdate))) {
    return { status: 400, message: 'Data de nascimento inválida // Invalid birthdate' };
  }
  return null;
};

const validateAddress = (postalcode, street, neighborhood, city, state, number) => {
  postalcode = postalcode.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos do CEP
  if (!postalcode || !/^\d{8}$/.test(postalcode)) {
    return { status: 400, message: 'CEP inválido // Invalid postal code' };
  }
  if (!street || street.trim() === '') {
    return { status: 400, message: 'Rua é obrigatória // Street is required' };
  }
  if (!neighborhood || neighborhood.trim() === '') {
    return { status: 400, message: 'Bairro é obrigatório // Neighborhood is required' };
  }
  if (!city || city.trim() === '') {
    return { status: 400, message: 'Cidade é obrigatória // City is required' };
  }
  if (!state || !/^[A-Z]{2}$/.test(state)) {
    return { status: 400, message: 'Estado deve ter 2 letras // State must be 2 characters long' };
  }
  if (!number || number.trim() === '') {
    return { status: 400, message: 'Número do endereço é obrigatório // Address number is required' };
  }
  return null;
};

const validateDescription = (description) => {
  if (description && description.trim() === '') {
    return { status: 400, message: 'Descrição não pode ser vazia // Description cannot be empty' };
  }
  return null;
};

const validateRecycleTypes = (recycle_types) => {
  if (!recycle_types || recycle_types.trim() === '') {
    return { status: 400, message: 'Tipos de reciclagem são obrigatórios // Recycle types are required' };
  }
  // Adicionalmente, você pode adicionar validações específicas para o formato dos tipos de reciclagem, se necessário.
  return null;
};


module.exports = {
  validateCPF,
  validateName,
  validateGender,
  validateEmail,
  validatePassword,
  validateBirthdate,
  validateAddress,
  validateDescription,
  validateRecycleTypes
};
