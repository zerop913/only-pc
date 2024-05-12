module.exports = (sequelize, DataTypes) => {
  const Motherboard = sequelize.define(
    "Motherboard",
    {
      category_id: DataTypes.INTEGER,
      product_title: DataTypes.TEXT,
      product_images: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      manufacturer: DataTypes.TEXT,
      manufacturer_code: DataTypes.TEXT,
      socket: DataTypes.TEXT,
      chipset: DataTypes.TEXT,
      rear_panel_ports: DataTypes.TEXT,
      sata_controller: DataTypes.TEXT,
      raid_support: DataTypes.TEXT,
      integrated_graphics: DataTypes.TEXT,
      audio: DataTypes.TEXT,
      audio_controller: DataTypes.TEXT,
      expansion_slots: DataTypes.TEXT,
      m2_slot_type: DataTypes.TEXT,
      supported_pci_express_modes: DataTypes.TEXT,
      network_interface: DataTypes.TEXT,
      network_controller: DataTypes.TEXT,
      memory_type: DataTypes.TEXT,
      memory_slots: DataTypes.INTEGER,
      power_subsystem_radiator: DataTypes.TEXT,
      case_fan_connector_ports: DataTypes.TEXT,
      atx_12v_power_connector: DataTypes.TEXT,
      internal_usb_ports: DataTypes.TEXT,
      argb_5v_connector: DataTypes.TEXT,
      rgb_12v_connector: DataTypes.TEXT,
      preinstalled_processor: DataTypes.TEXT,
      form_factor: DataTypes.TEXT,
      delivery_type: DataTypes.TEXT,
      colors_used: DataTypes.TEXT,
      warranty_period: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
    },
    {
      timestamps: false,
      tableName: "motherboard",
    }
  );

  Motherboard.associate = function (models) {
    Motherboard.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return Motherboard;
};
