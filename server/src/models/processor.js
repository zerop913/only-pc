module.exports = (sequelize, DataTypes) => {
  const Processor = sequelize.define(
    "Processor",
    {
      product_title: DataTypes.TEXT,
      product_images: DataTypes.TEXT,
      price: DataTypes.BIGINT,
      manufacturer: DataTypes.TEXT,
      manufacturer_code: DataTypes.TEXT,
      product_line: DataTypes.TEXT,
      model: DataTypes.TEXT,
      socket: DataTypes.TEXT,
      architecture: DataTypes.TEXT,
      core: DataTypes.TEXT,
      core_count: DataTypes.BIGINT,
      thread_count: DataTypes.TEXT,
      integrated_graphics: DataTypes.TEXT,
      video_processor: DataTypes.TEXT,
      cache_l1: DataTypes.TEXT,
      cache_l2: DataTypes.TEXT,
      cache_l3: DataTypes.TEXT,
      base_clock: DataTypes.TEXT,
      turbo_clock: DataTypes.TEXT,
      multiplier: DataTypes.TEXT,
      unlocked_multiplier: DataTypes.TEXT,
      process_technology: DataTypes.TEXT,
      max_working_temperature: DataTypes.TEXT,
      typical_power_consumption: DataTypes.TEXT,
      technologies: DataTypes.TEXT,
      cooler_included: DataTypes.TEXT,
      delivery_type: DataTypes.TEXT,
      warranty: DataTypes.TEXT,
      manufacturer_website: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  Processor.associate = function (models) {
    Processor.belongsTo(models.Category, { foreignKey: "category_id" });
  };

  return Processor;
};
