const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserInfo = sequelize.define(
    "UserInfo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "User",
          key: "id",
        },
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      middle_name: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "user_info",
      timestamps: false,
    }
  );

  UserInfo.associate = (models) => {
    UserInfo.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return UserInfo;
};
