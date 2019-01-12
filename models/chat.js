module.exports = function (sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Chat.associate = function(models) {

    Chat.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Chat;
};