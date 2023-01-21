'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products',
    [
      {
        name: 'Skol Lata 250ml',
        price: 2.20,
        url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
      {
        name: 'Heineken 600ml',
        price: 7.50,
        url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
      },
      {
        name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      },
      {
        name: 'Brahma 600ml',
        price: 7.50,
        url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
      },
      {
        name: 'Skol 269ml',
        price: 2.19,
        url_image: 'http://localhost:3001/images/skol_269ml.jpg',
      },
      {
        name: 'Skol Beats Senses 313ml',
        price: 4.49,
        url_image: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
