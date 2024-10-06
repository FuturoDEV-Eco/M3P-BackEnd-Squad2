const User = require('./User');
const CollectionPoint = require('./CollectionPoint');

// Chamando as associações
User.associate({ CollectionPoint });
CollectionPoint.associate({ User });

module.exports = {
  User,
  CollectionPoint,
};
