module.exports = (sequelize, DataTypes) => {
  const NakopiteliSsd = sequelize.define(
    "nakopiteli_ssd",
    {
      product_title: DataTypes.TEXT,
      product_images: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      manufacturer: DataTypes.TEXT,
      manufacturer_code: DataTypes.TEXT,
      purpose: DataTypes.TEXT,
      type: DataTypes.TEXT,
      form_factor: DataTypes.TEXT,
      size_m2: DataTypes.TEXT,
      interface: DataTypes.TEXT,
      dram_buffer: DataTypes.TEXT,
      storage_capacity: DataTypes.TEXT,
      flash_memory_type: DataTypes.TEXT,
      controller: DataTypes.TEXT,
      cache_memory_capacity: DataTypes.TEXT,
      read_speed: DataTypes.TEXT,
      write_speed: DataTypes.TEXT,
      random_read_speed_4kb_blocks: DataTypes.TEXT,
      random_write_speed_4kb_blocks: DataTypes.TEXT,
      mean_time_to_failure: DataTypes.TEXT,
      colors_used: DataTypes.TEXT,
      weight: DataTypes.TEXT,
      warranty: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "nakopiteli_ssd",
    }
  );

  NakopiteliSsd.associate = function (models) {
    NakopiteliSsd.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return NakopiteliSsd;
};
