const db = require('../model');

db.sequelize.sync({ alter: false }).then((req) => {
  console.log("database connection successfully !");
}).catch((err) => {
  console.log("database error: ", err);
});