"use strict";

module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("Device", {
    device_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: "The device name should be at least 1 character long"
        }
      }
    },
    brand: {
      type: DataTypes.STRING,
      validate:{
        isAlphanumeric:{
          msg: "The device brand should be at least 1 character long"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      isInt:{
        msg: "The price should be a number"
      }
    },
    contract_type: {
      type: DataTypes.STRING,
      validate:{
        isIn: {
        args: [["New", "Renew"]],
        msg:"Wrong type of contrat type"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Device.hasMany(models.Plan);
      }
    }
  });

  return Device;
};
