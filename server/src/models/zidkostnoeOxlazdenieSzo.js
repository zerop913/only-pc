module.exports = (sequelize, DataTypes) => {
  const ZidkostnoeOxlazdenieSzo = sequelize.define(
    "zidkostnoe_oxlazdenie_szo",
    {
      product_title: DataTypes.TEXT,
      product_images: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      manufacturer: DataTypes.TEXT,
      manufacturer_code: DataTypes.TEXT,
      cooling_system: DataTypes.TEXT,
      purpose: DataTypes.TEXT,
      socket: DataTypes.TEXT,
      max_power_dissipation: DataTypes.TEXT,
      fan_count: DataTypes.TEXT,
      fan_size: DataTypes.TEXT,
      fan_speed: DataTypes.TEXT,
      fan_noise_level: DataTypes.TEXT,
      airflow: DataTypes.TEXT,
      bearing_type: DataTypes.TEXT,
      speed_control: DataTypes.TEXT,
      water_block_material: DataTypes.TEXT,
      radiator_size: DataTypes.TEXT,
      radiator_material: DataTypes.TEXT,
      radiator_mount_size: DataTypes.TEXT,
      illumination: DataTypes.TEXT,
      illumination_type: DataTypes.TEXT,
      colors_used: DataTypes.TEXT,
      dimensions: DataTypes.TEXT,
      weight: DataTypes.TEXT,
      warranty: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "zidkostnoe_oxlazdenie_szo",
    }
  );

  ZidkostnoeOxlazdenieSzo.associate = function (models) {
    ZidkostnoeOxlazdenieSzo.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return ZidkostnoeOxlazdenieSzo;
};
