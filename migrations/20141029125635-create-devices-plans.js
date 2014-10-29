"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("DevicesPlans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      DeviceId: {
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
    migration.dropTable("DevicesPlans").done(done);
  }
};