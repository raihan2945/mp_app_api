require("dotenv").config();
require('module-alias/register');
const http = require("http");
const app = require("./app");
const { connectDB } = require("./db/");
const db = require("./model");

const { requireFromRoot } = require('../src/utils/requireFromRoot')

const server = http.createServer(app);

var port = process.env.PORT || 6070;

const main = async () => {
  try {
    // await connectDB();
    db.sequelize
      .sync({ alter: false })
      .then((req) => {
        console.log("database connection successfully !");
      })
      .catch((err) => {
        console.log("database error: ", err);
      });

    server.listen(port, async () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

main();