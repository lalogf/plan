"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING
      },
      password: {
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
    migration.dropTable("Users").done(done);
  }
};

// passport.use(new localStrategy({
//     username: 'username',
//     password: 'password'
//   }, function(username, password, done) {
//       User.find({
//         where: {
//           username: username
//         }
//       }).done(function(error, user) {
//         if (user) {
//           if (User.comparePass(password, user.password)) {
//             done(null, user);
//           } else {
//             done(null, null);
//           }
//         } else {
//           done(null, null);
//         }
//       });
//     }
//   ));