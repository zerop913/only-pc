module.exports = (sequelize, DataTypes) => {
  const Korpusa = sequelize.define(
    "korpusa",
    {
      category_id: DataTypes.INTEGER,
      product_title: DataTypes.TEXT,
      product_images: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      manufacturer: DataTypes.TEXT,
      manufacturer_code: DataTypes.TEXT,
      size_type: DataTypes.TEXT,
      form_factor: DataTypes.TEXT,
      power_supply: DataTypes.TEXT,
      psu_form_factor: DataTypes.TEXT,
      psu_location: DataTypes.TEXT,
      case_material: DataTypes.TEXT,
      side_window_presence: DataTypes.TEXT,
      aquarium: DataTypes.TEXT,
      window_material: DataTypes.TEXT,
      internal_bays_2_5: DataTypes.TEXT,
      internal_bays_3_5: DataTypes.TEXT,
      expansion_slots_count: DataTypes.TEXT,
      hdd_placement: DataTypes.TEXT,
      ssd_hdd_vertical_mount: DataTypes.TEXT,
      max_gpu_length: DataTypes.TEXT,
      max_cpu_cooler_height: DataTypes.TEXT,
      max_psu_length: DataTypes.TEXT,
      front_panel_interfaces: DataTypes.TEXT,
      installed_fans: DataTypes.TEXT,
      additional_fan_locations: DataTypes.TEXT,
      diy_ape_supported: DataTypes.TEXT,
      case_lighting: DataTypes.TEXT,
      lighting_type: DataTypes.TEXT,
      aio_support: DataTypes.TEXT,
      dust_filter: DataTypes.TEXT,
      additional_information: DataTypes.TEXT,
      color_scheme: DataTypes.TEXT,
      dimensions: DataTypes.TEXT,
      weight: DataTypes.TEXT,
      warranty: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
    },
    {
      timestamps: false,
      tableName: "korpusa",
    }
  );

  Korpusa.associate = function (models) {
    Korpusa.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return Korpusa;
};
