"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("CarriersPlans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      CarrierId: {
        type: DataTypes.INTEGER
      },
      PlanId: {
        type: DataTypes.INTEGER
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
    migration.dropTable("CarriersPlans").done(done);
  }
};