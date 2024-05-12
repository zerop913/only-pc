module.exports = (sequelize, DataTypes) => {
  const OperativnayaPamyat = sequelize.define(
    "operativnaya_pamyat",
    {
      product_title: DataTypes.TEXT,
      product_images: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      manufacturer: DataTypes.TEXT,
      manufacturer_code: DataTypes.TEXT,
      form_factor: DataTypes.TEXT,
      memory_type: DataTypes.TEXT,
      memory_capacity: DataTypes.TEXT,
      per_module_capacity: DataTypes.TEXT,
      module_quantity: DataTypes.INTEGER,
      frequency: DataTypes.TEXT,
      bandwidth: DataTypes.TEXT,
      cas_latency: DataTypes.TEXT,
      ras_to_cas_delay: DataTypes.TEXT,
      row_precharge_delay: DataTypes.TEXT,
      activate_to_precharge_delay: DataTypes.TEXT,
      voltage: DataTypes.TEXT,
      xmp_support: DataTypes.TEXT,
      cooling_system: DataTypes.TEXT,
      illumination: DataTypes.TEXT,
      low_profile: DataTypes.TEXT,
      color_scheme: DataTypes.TEXT,
      warranty: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "operativnaya_pamyat",
    }
  );

  OperativnayaPamyat.associate = function (models) {
    OperativnayaPamyat.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return OperativnayaPamyat;
};
