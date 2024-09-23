const { DataTypes } = require('sequelize');
const connection = require('../database/connection');

const CollectionPoint = connection.define('collection_points', {
  name: {
    type: DataTypes.STRING(180),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recycle_types: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postalcode: {
    type: DataTypes.STRING(8),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [8, 8],
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
      len: [2, 2],
    },
  },
  number: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  complement: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  map_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

CollectionPoint.associate = (models) => {
  CollectionPoint.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user',
  });
};

module.exports = CollectionPoint;
