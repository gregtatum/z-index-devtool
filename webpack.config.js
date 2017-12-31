var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: {
    "extension/devtools/panel/bundle": "./extension/src/panel.js",
    "/docs/bundle": "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, ".")
  },
  plugins: [new webpack.EnvironmentPlugin(["NODE_ENV"])]
};
