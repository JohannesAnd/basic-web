const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProduction = false;

const extractLESS = new ExtractTextPlugin("less_[name].css");
const extractCSS = new ExtractTextPlugin("css_[name].css");

module.exports = {
  entry: "./scripts/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        test: /\.less$/,
        use: extractLESS.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      },
      { test: /\.js$/, loader: "babel-loader", options: { presets: ["env"] } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    extractLESS,
    extractCSS
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
