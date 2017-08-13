const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = false;

module.exports = {
  entry: "./scripts/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      },
      { test: /\.js$/, loader: "babel-loader", options: { presets: ["env"] } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devServer: isProduction
    ? {}
    : {
        historyApiFallback: true,
        stats: "errors-only",
        contentBase: "./build",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization"
        }
      }
};
