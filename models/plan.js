"use strict";

module.exports = function(sequelize, DataTypes) {
  var Plan = sequelize.define("Plan", {
    plan_name: {
      type: DataTypes.STRING
      // validate: {
      //   isAlphanumeric: true
      // }
    },
    data: {
      type: DataTypes.INTEGER,
      validate: {
        isInt : {
          msg: "The montly data should be a number"
        }
      }
    },
    talk_min: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg:"The talk minutes should be represented by a number"
        }
      }
    },
    sms:{
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg:"The SMS for the plan should be represented by a number"
        }
      }
    },
    private_net_min: {    
      type: DataTypes.INTEGER,
      validate:{
        isInt: {
          msg:"The private network minutes should be represented by a number"
        }
      }
    },
    monthly_price: {
      type: DataTypes.INTEGER,
      validate:{
        isInt:{
          msg:"The monthly price should be a number"
        }
      }
    },
    price_range: {
      type: DataTypes.INTEGER,
      validate:{
        isInt:{
          msg:"The price range should be a number"
        }
      }
    },
    LTE_support: {
      type: DataTypes.STRING,
      validate:{
        isIn: [["Yes", "No"]]
      }
    },
    other_costs: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg:"Other costs should be at least 1 character long"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Plan.hasMany(models.Carrier);
        Plan.hasMany(models.Device);
      }
    }
  });

  return Plan;
};
