module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        len: {
          args: [1, 15],
          msg: "Must be at least 1 to 15 characters in length."
        }
      }
    }
  });

  User.associate = function(models) {

    User.hasMany(models.Pics, {
      onDelete: "CASCADE"
    });

    User.hasMany(models.Chat, {
      onDelete: "CASCADE"
    });
  };

  return User;
};
