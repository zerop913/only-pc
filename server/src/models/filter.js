module.exports = (sequelize, DataTypes) => {
  const ProcessorFilter = sequelize.define(
    "ProcessorFilter",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      filter_name: DataTypes.STRING,
      filter_desc: DataTypes.STRING,
      filter_values: DataTypes.JSON,
      category_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  return ProcessorFilter;
};
