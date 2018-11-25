'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner: {
        type: Sequelize.STRING,
        allowNull: false
      },
      line1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      line2: {
        type: Sequelize.STRING
      },
      line3: {
        type: Sequelize.STRING
      },
      line4: {
        type: Sequelize.STRING,
        allowNull: false
      },
      postCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numberOfBedrooms: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      numberOfBathrooms: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      airbnbId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      incomeGenerated: {
        type: Sequelize.DECIMAL(13,2).UNSIGNED,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('Properties', ['numberOfBathrooms'], {
      type: 'check',
      where: {
        numberOfBathrooms: {
          [Sequelize.Op.gt]: 0
        }
      }
    })).then(() => queryInterface.addConstraint('Properties', ['incomeGenerated'], {
      type: 'check',
      where: {
        incomeGenerated: {
          [Sequelize.Op.gt]: 0
        }
      }
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Properties');
  }
};
