"use strict";

module.exports = function(sequelize, DataTypes) {
  var Carrier = sequelize.define("Carrier", {
    carrier_name: DataTypes.STRING,
    country_code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Carrier.hasMany(models.Plan);
      }
    }
  });

  return Carrier;
};
