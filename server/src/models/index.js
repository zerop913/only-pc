const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/database")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Processor = require("./processor")(sequelize, Sequelize.DataTypes);
db.Category = require("./category")(sequelize, Sequelize.DataTypes);
db.Subcategory = require("./subcategory")(sequelize, Sequelize.DataTypes);
db.Videocard = require("./videocard")(sequelize, Sequelize.DataTypes);
db.Motherboard = require("./motherboard")(sequelize, Sequelize.DataTypes);
db.KuleryDlyaProcessorov = require("./kulery")(sequelize, Sequelize.DataTypes);
db.ZidkostnoeOxlazdenieSzo = require("./zidkostnoeOxlazdenieSzo")(
  sequelize,
  Sequelize.DataTypes
);
db.OperativnayaPamyat = require("./operativnayaPamyat")(
  sequelize,
  Sequelize.DataTypes
);
db.NakopiteliSsd = require("./nakopiteliSsd")(sequelize, Sequelize.DataTypes);
db.ZhestkieDiskiHdd = require("./zhestkieDiskiHdd")(
  sequelize,
  Sequelize.DataTypes
);
db.BlokiPitaniya = require("./blokiPitaniya")(sequelize, Sequelize.DataTypes);
db.Korpusa = require("./korpusa")(sequelize, Sequelize.DataTypes);
db.Filter = require("./filter")(sequelize, Sequelize.DataTypes);
const User = require("./user")(sequelize, Sequelize);
const Role = require("./role")(sequelize, Sequelize);
const UserInfo = require("./userInfo")(sequelize, Sequelize);
db.User = User;
db.Role = Role;
db.UserInfo = UserInfo;

db.Processor.associate(db);
db.Category.associate(db);
db.Subcategory.associate(db);
db.Videocard.associate(db);
db.Motherboard.associate(db);
db.KuleryDlyaProcessorov.associate(db);
db.ZidkostnoeOxlazdenieSzo.associate(db);
db.OperativnayaPamyat.associate(db);
db.NakopiteliSsd.associate(db);
db.ZhestkieDiskiHdd.associate(db);
db.BlokiPitaniya.associate(db);
db.Korpusa.associate(db);
db.User.associate(db);
db.UserInfo.associate(db);

module.exports = db;
