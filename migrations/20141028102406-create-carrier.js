"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Carriers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      carrier_name: {
        type: DataTypes.STRING
      },
      country_code: {
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
    migration.dropTable("Carriers").done(done);
  }
};