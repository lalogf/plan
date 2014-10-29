"use strict";

module.exports = function(sequelize, DataTypes) {
  var Carrier = sequelize.define("Carrier", {
    carrier_name: {
      type: DataTypes.STRING,
      validate:{
        isAlphanumeric:{
          msg:"Carrier name should be at least one character long!"
        }
      }
    },
    country_code: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        isUppercase: true,
        len: [2,2]
      }
    } 
  }, {
    classMethods: {
      associate: function(models) {
        Carrier.hasMany(models.Plan);
      }
    }
  });

  return Carrier;
};
