'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Elza Juliana da Mata',
        cpf: '91124363998',
        gender: 'F',
        postalcode: '88048366',
        street: 'Travessa Aguará',
        number: 626,
        neighborhood: 'Rio Tavares',
        city: 'Florianópolis',
        state: 'SC',
        email: 'elza-damata79@zk.arq.br',
        password: bcrypt.hashSync('mWWAx9Ob2k', 10),
        birthdate: '1994-03-17',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Anthony Marcos Vinicius Lorenzo Rezende',
        cpf: '95040637993',
        gender: 'M',
        postalcode: '88030320',
        street: 'Rua São Miguel',
        number: 926,
        neighborhood: 'João Paulo',
        city: 'Florianópolis',
        state: 'SC',
        email: 'anthony.marcos.rezende@sinalmanaus.com.br',
        password: bcrypt.hashSync('uXk5I96oyT', 10),
        birthdate: '1994-04-02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Betina Benedita Lopes',
        cpf: '33194739999',
        gender: 'F',
        postalcode: '88049470',
        street: 'Servidão Kauri',
        number: 840,
        neighborhood: 'Tapera',
        city: 'Florianópolis',
        state: 'SC',
        email: 'betina-lopes90@br.inter.net',
        password: bcrypt.hashSync('TZ3j5XeqPR', 10),
        birthdate: '1994-05-09',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brenda Fátima Almada',
        cpf: '94974242997',
        gender: 'F',
        postalcode: '88025318',
        street: 'Servidão Orlando Clarindo Machado',
        number: 908,
        neighborhood: 'Agronômica',
        city: 'Florianópolis',
        state: 'SC',
        email: 'brenda-almada75@eanac.com.br',
        password: bcrypt.hashSync('DRDXfGAAjX', 10),
        birthdate: '1994-05-18',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Raquel Nina Costa',
        cpf: '80012101974',
        gender: 'F',
        postalcode: '88090192',
        street: 'Rua João Meirelles',
        number: 737,
        neighborhood: 'Capoeiras',
        city: 'Florianópolis',
        state: 'SC',
        email: 'raquelninacosta@kof.com.mx',
        password: bcrypt.hashSync('XKA09cY31p', 10),
        birthdate: '1994-06-15',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
