'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'collection_points',
      [
        {
          name: 'Ecoponto Dakir Polidoro',
          description:
            'Ponto de coleta de vidros. Localizado no meio da rua. Coleta padrão da Comcap.',
          recycle_types: 'Vidros',
          postalcode: '88063565',
          street: 'Rua Radialista Dakir Polidoro',
          number: 's/n',
          complement: '',
          neighborhood: 'Campeche',
          city: 'Florianópolis',
          state: 'SC',
          latitude: -27.67203,
          longitude: -48.48181,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Fort - Campeche',
          description:
            'Fort Atacado - coleta de cápsulas de café Dolce Gusto e talvez outras marcas',
          recycle_types: 'Cápsulas de café',
          postalcode: '88063700',
          street: 'Rodovia Francisco Magno Vieira',
          number: 's/n',
          complement: '405',
          neighborhood: 'Rio Tavares',
          city: 'Florianópolis',
          state: 'SC',
          latitude: -27.687,
          longitude: -48.50934,
          user_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ecoponto Bistek',
          description: 'Ecoponto de coleta de lâmpadas e pilhas.',
          recycle_types: 'Lâmpadas',
          postalcode: '88047010',
          street: 'Rua João Câncio Jacques',
          number: '49',
          complement: '',
          neighborhood: 'Costeira do Pirajubaé',
          city: 'Florianópolis',
          state: 'SC',
          latitude: -27.62204,
          longitude: -48.52619,
          user_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Farmácia Panvel',
          description: 'Coleta remédios vencidos e blisters vazios',
          recycle_types: 'Remédios ou blisters',
          postalcode: '88062020',
          street: 'Rua Henrique Véra do Nascimento',
          number: '110',
          complement: '',
          neighborhood: 'Lagoa da Conceição',
          city: 'Florianópolis',
          state: 'SC',
          latitude: -27.60434,
          longitude: -48.4651,
          user_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Posto Galo Pedrita',
          description:
            'A cada 2L de óleo de cozinha usado, você ganha uma barra de sabão feita pela ong Todos Juntos',
          recycle_types: 'Óleo de cozinha',
          postalcode: '88048301',
          street: 'Rodovia Doutor Antônio Luiz Moura Gonzaga',
          number: '2361',
          complement: '',
          neighborhood: 'Rio Tavares',
          city: 'Florianópolis',
          state: 'SC',
          latitude: -27.65187,
          longitude: -48.47866,
          user_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('collection_points', null, {});
  },
};
