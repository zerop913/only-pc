module.exports = (sequelize, DataTypes) => {
  const ZhestkieDiskiHdd = sequelize.define(
    "zhestkie_diski_hdd",
    {
      product_title: DataTypes.TEXT,
      product_images: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      manufacturer: DataTypes.TEXT,
      manufacturer_code: DataTypes.TEXT,
      purpose: DataTypes.TEXT,
      type: DataTypes.TEXT,
      form_factor: DataTypes.TEXT,
      interface: DataTypes.TEXT,
      hdd_capacity: DataTypes.TEXT,
      buffer_memory_capacity: DataTypes.TEXT,
      spindle_rotation_speed: DataTypes.TEXT,
      operational_hours: DataTypes.TEXT,
      weight: DataTypes.TEXT,
      dimensions: DataTypes.TEXT,
      warranty: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "zhestkie_diski_hdd",
    }
  );

  ZhestkieDiskiHdd.associate = function (models) {
    ZhestkieDiskiHdd.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return ZhestkieDiskiHdd;
};
