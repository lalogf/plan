"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Plans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      plan_name: {
        type: DataTypes.STRING
      },
      data: {
        type: DataTypes.INTEGER
      },
      talk_min: {
        type: DataTypes.INTEGER
      },
      sms: {
        type: DataTypes.INTEGER
      },
      private_net_min: {
        type: DataTypes.INTEGER
      },
      monthly_price: {
        type: DataTypes.INTEGER
      },
      price_range: {
        type: DataTypes.STRING
      },
      LTE_support: {
        type: DataTypes.STRING
      },
      other_costs: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Plans").done(done);
  }
};