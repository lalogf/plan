"use strict";

module.exports = function(sequelize, DataTypes) {
  var CarriersPlans = sequelize.define("CarriersPlans", {
    CarrierId: DataTypes.INTEGER,
    PlanId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return CarriersPlans;
};
