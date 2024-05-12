module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define(
    "subcategories",
    {
      subcategory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subcategory_name: DataTypes.STRING,
      subcategory_description: DataTypes.TEXT,
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "subcategories",
    }
  );

  Subcategory.associate = function (models) {
    Subcategory.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return Subcategory;
};
