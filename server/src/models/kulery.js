module.exports = (sequelize, DataTypes) => {
  const KuleryDlyaProcessorov = sequelize.define(
    "kulery_dlya_processorov",
    {
      product_title: DataTypes.TEXT,
      product_images: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      manufacturer: DataTypes.TEXT,
      manufacturer_code: DataTypes.TEXT,
      purpose: DataTypes.TEXT,
      socket: DataTypes.TEXT,
      cooling_system: DataTypes.TEXT,
      max_power_dissipation: DataTypes.TEXT,
      heat_pipes: DataTypes.TEXT,
      radiator_material: DataTypes.TEXT,
      base_material: DataTypes.TEXT,
      fan_count: DataTypes.TEXT,
      fan_size: DataTypes.TEXT,
      fan_speed: DataTypes.TEXT,
      fan_noise_level: DataTypes.TEXT,
      airflow: DataTypes.TEXT,
      bearing_type: DataTypes.TEXT,
      speed_controller: DataTypes.TEXT,
      illumination: DataTypes.TEXT,
      cooler_height: DataTypes.TEXT,
      colors_used: DataTypes.TEXT,
      dimensions: DataTypes.TEXT,
      weight: DataTypes.TEXT,
      warranty: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "kulery_dlya_processorov",
    }
  );

  KuleryDlyaProcessorov.associate = function (models) {
    KuleryDlyaProcessorov.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return KuleryDlyaProcessorov;
};
