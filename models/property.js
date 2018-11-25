'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    owner: DataTypes.STRING,
    line1: DataTypes.STRING,
    line2: DataTypes.STRING,
    line3: DataTypes.STRING,
    line4: DataTypes.STRING,
    postCode: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    numberOfBedrooms: DataTypes.INTEGER.UNSIGNED,
    numberOfBathrooms: DataTypes.INTEGER.UNSIGNED,
    airbnbId: DataTypes.BIGINT.UNSIGNED,
    incomeGenerated: DataTypes.DECIMAL(13,2).UNSIGNED
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
  };
  return Property;
};
