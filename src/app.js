const express = require('express');
const applyMiddleware = require('./middleware');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');

// const {dailySchedule} = require('./lib/promotion/schedule')

// const someModule = require('@/src/routes');

// express app
const app = express();
app.use(cors());
applyMiddleware(app);
app.use(routes);

// <<<<<<< HEAD
const publicUploadFolderPath = path.join(__dirname, "../uploads");

// console.log("public upload folder is :", publicUploadFolderPath);

app.use("/uploads", express.static(publicUploadFolderPath));

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

// dailySchedule()

app.use((err, _req, res, next) => {
  // TODO: format error
  // console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;