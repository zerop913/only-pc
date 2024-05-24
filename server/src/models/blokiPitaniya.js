module.exports = (sequelize, DataTypes) => {
  const BlokiPitaniya = sequelize.define(
    "bloki_pitaniya",
    {
      product_title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      product_images: DataTypes.TEXT,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      manufacturer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      manufacturer_code: DataTypes.TEXT,
      power: DataTypes.TEXT,
      standard: DataTypes.TEXT,
      pfc: DataTypes.TEXT,
      fan_size: DataTypes.TEXT,
      motherboard_connector_type: DataTypes.TEXT,
      cpu_4_4_pin_count: DataTypes.TEXT,
      pci_e_6_2_pin_count: DataTypes.TEXT,
      molex_4_pin_count: DataTypes.TEXT,
      sata_15_pin_count: DataTypes.TEXT,
      floppy_4_pin_count: DataTypes.TEXT,
      line_3_3_v_current: DataTypes.TEXT,
      line_5_v_current: DataTypes.TEXT,
      line_12_v_1_current: DataTypes.TEXT,
      line_minus_12_v_current: DataTypes.TEXT,
      line_5_v_standby_current: DataTypes.TEXT,
      overvoltage_protection: DataTypes.TEXT,
      overload_protection: DataTypes.TEXT,
      short_circuit_protection: DataTypes.TEXT,
      plus_80_certificate: DataTypes.TEXT,
      detachable_cables: DataTypes.TEXT,
      motherboard_power_cable_length: DataTypes.TEXT,
      illumination: DataTypes.TEXT,
      color_scheme: DataTypes.TEXT,
      dimensions: DataTypes.TEXT,
      weight: DataTypes.TEXT,
      warranty: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "bloki_pitaniya",
    }
  );

  BlokiPitaniya.associate = function (models) {
    BlokiPitaniya.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return BlokiPitaniya;
};
