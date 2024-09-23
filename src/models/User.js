const { DataTypes } = require('sequelize');
const connection = require('../database/connection');
const { hashSync } = require('bcryptjs');

// Função para remover pontos e hífens do CPF antes de salvar
const formatCPF = (cpf) => cpf.replace(/[^\d]+/g, '');

// Função para remover o hífen do CEP antes de salvar
const formatPostalCode = (postalcode) => postalcode.replace(/[^\d]+/g, '');

const User = connection.define(
  'users',
  {
    name: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [11, 11], // Validação para exatamente 11 caracteres
      },
    },
    gender: {
      type: DataTypes.ENUM('M', 'F', 'O'),
      allowNull: false,
    },
    postalcode: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [8, 8], // Validação para exatamente 8 caracteres
      },
    },
    street: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2, 2], // Validação para exatamente 2 caracteres
      },
    },
    number: {
      type: DataTypes.STRING(10), // Alterado para STRING com comprimento 10 para permitir valores como S/N
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(180),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    hooks: {
      beforeSave: (user) => {
        if (user.password) {
          user.password = hashSync(user.password, 10);
        }
        if (user.cpf) {
          user.cpf = formatCPF(user.cpf);
        }
        if (user.postalcode) {
          user.postalcode = formatPostalCode(user.postalcode);
        }
      },
    },
  }
);

User.associate = (models) => {
  User.hasMany(models.CollectionPoint, {
    foreignKey: 'user_id',
    as: 'collectionPoints',
  });
};

module.exports = User;
