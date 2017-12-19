var path = require("path");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    "extension/devtools/panel/bundle": "./panel.js",
    "/docs/bundle": "./index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, ".")
  }
};
