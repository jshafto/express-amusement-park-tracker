'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Parks', [
      {
        parkName: 'Six Flags',
        city: 'Arlington',
        provinceState: 'Texas',
        country: 'U.S.A',
        opened: new Date('1961-08-05'),
        size: 'really big',
        description: 'fun theme park with a lot of roller coasters',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Parks', null, {});
  }
};
