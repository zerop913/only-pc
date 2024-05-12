const db = require("../models/index");
const { QueryTypes } = require("sequelize");

exports.getFilters = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const tableName = `${categoryName.replace(/-/g, "_")}_filter`;
    const filters = await db.sequelize.query(`SELECT * FROM "${tableName}"`, {
      type: db.sequelize.QueryTypes.SELECT,
    });

    if (filters.length === 0) {
      return res.status(404).json({ error: "Filters not found" });
    }

    // Получение уникальных значений для каждого фильтра
    for (const filter of filters) {
      const distinctValues = await db.sequelize.query(
        `
        SELECT DISTINCT "${filter.filter_name}"
        FROM "${categoryName.replace(/-/g, "_")}"
        WHERE "${filter.filter_name}" IS NOT NULL
      `,
        {
          type: QueryTypes.SELECT,
          mapToModel: true,
        }
      );

      filter.filter_values = distinctValues.map(
        (value) => value[filter.filter_name]
      );
    }

    return res.json(filters);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
