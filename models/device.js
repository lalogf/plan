"use strict";

module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("Device", {
    device_name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.INTEGER,
    contract_type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Device.belongsTo(models.Plan);
      }
    }
  });

  return Device;
};
