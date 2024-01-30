const path = require('path');

module.exports = {
  requireFromRoot: (filePath) => require(path.join(__dirname, filePath)),
};