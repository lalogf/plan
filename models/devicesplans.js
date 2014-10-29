"use strict";

module.exports = function(sequelize, DataTypes) {
  var DevicesPlans = sequelize.define("DevicesPlans", {
    DeviceId: DataTypes.INTEGER,
    PlanId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return DevicesPlans;
};
