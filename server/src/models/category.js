module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      images: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  );

  Category.associate = function (models) {
    Category.hasMany(models.Processor, { foreignKey: "category_id" });
    Category.hasMany(models.Videocard, { foreignKey: "category_id" });
    Category.hasMany(models.KuleryDlyaProcessorov, {
      foreignKey: "category_id",
    });
    Category.hasMany(models.Filter, { foreignKey: "category_id" });
  };

  return Category;
};
