"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Devices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      device_name: {
        type: DataTypes.STRING
      },
      brand: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.INTEGER
      },
      contract_type: {
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
    migration.dropTable("Devices").done(done);
  }
};