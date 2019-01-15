module.exports = function (sequelize, DataTypes) {

  var Pics = sequelize.define("Pics", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Pics.associate = function (models) {

    Pics.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

  };
  return Pics;
};