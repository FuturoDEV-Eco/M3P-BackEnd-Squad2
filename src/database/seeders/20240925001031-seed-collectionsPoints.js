'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('collection_points', [{
      name: 'Ecoponto Costão do Santinho'
      ,
      description: 'Aberto todos os dias das 8hrs até as 19hrs'
      ,
      recycle_types: 'Vidro'
      ,
      postalcode: '88110660'
      ,
      street: 'Rua Pedro André Hermes'
      ,
      neighborhood: 'Avenida das torres'
      ,
      city: 'Florianópolis'
      ,
      state: 'SC'
      ,
      number: 48988162411
      ,
      complement: 
        'Telefone celular'
      ,
      latitude: -27.6400913
      ,
      longitude: -48.9172192
      ,
      map_link: 'https://www.google.com/maps?q=-27.6400913,-48.9172192'
      ,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
