"use strict";
// const dbConfig = require('../db/dbConfig.json')

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../db/dbConfig.json")[env];
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

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.Order.hasMany(db.OrderedProduct, { foreignKey: "order_id" });
// db.OrderedProduct.belongsTo(db.OrderedProduct, { foreignKey: "order_id" });
// db.OrderedProduct.belongsTo(db.Product, { foreignKey: "product_id" });

// db.Shop.belongsToMany(db.Product, { through: db.AssignProduct, foreignKey:"shop_id" });
// db.Product.belongsToMany(db.Shop, { through: db.AssignProduct, foreignKey:"product_id"});


module.exports = db;
