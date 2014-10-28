"use strict";

module.exports = function(sequelize, DataTypes) {
  var Plan = sequelize.define("Plan", {
    plan_name: DataTypes.STRING,
    data: DataTypes.INTEGER,
    talk_min: DataTypes.INTEGER,
    sms: DataTypes.INTEGER,
    private_net_min: DataTypes.INTEGER,
    monthly_price: DataTypes.INTEGER,
    price_range: DataTypes.STRING,
    LTE_support: DataTypes.STRING,
    other_costs: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Plan.belongsTo(models.Carrier);
        Plan.hasMany(models.Device);
      }
    }
  });

  return Plan;
};
