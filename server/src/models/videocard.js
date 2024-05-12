module.exports = (sequelize, DataTypes) => {
  const Videocard = sequelize.define(
    "Videocard",
    {
      product_title: DataTypes.TEXT,
      product_images: DataTypes.TEXT,
      price: DataTypes.BIGINT,
      manufacturer: DataTypes.TEXT,
      manufacturer_code: DataTypes.TEXT,
      interface: DataTypes.TEXT,
      gpu_manufacturer: DataTypes.TEXT,
      series: DataTypes.TEXT,
      slot_space_required: DataTypes.TEXT,
      low_profile: DataTypes.TEXT,
      cooling_system: DataTypes.TEXT,
      fan_count: DataTypes.TEXT,
      ports: DataTypes.TEXT,
      gpu_architecture: DataTypes.TEXT,
      gpu_codename: DataTypes.TEXT,
      process_technology: DataTypes.TEXT,
      gpu_clock_speed: DataTypes.TEXT,
      gpu_boost_clock_speed: DataTypes.TEXT,
      stream_processors_count: DataTypes.BIGINT,
      oc_version: DataTypes.TEXT,
      sli_crossfire_support: DataTypes.TEXT,
      directx_support: DataTypes.TEXT,
      opengl_support: DataTypes.TEXT,
      memory_capacity: DataTypes.TEXT,
      memory_type: DataTypes.TEXT,
      memory_bus_width: DataTypes.TEXT,
      bandwidth: DataTypes.TEXT,
      memory_clock_speed: DataTypes.TEXT,
      supported_monitors_count: DataTypes.TEXT,
      max_resolution: DataTypes.TEXT,
      additional_power_requirements: DataTypes.TEXT,
      additional_power_connector: DataTypes.TEXT,
      recommended_power_supply_wattage: DataTypes.TEXT,
      tdp: DataTypes.TEXT,
      illumination: DataTypes.TEXT,
      delivery_type: DataTypes.TEXT,
      color_scheme: DataTypes.TEXT,
      dimensions: DataTypes.TEXT,
      weight: DataTypes.TEXT,
      warranty: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  Videocard.associate = function (models) {
    Videocard.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return Videocard;
};
