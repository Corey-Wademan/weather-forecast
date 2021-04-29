const path = require("path")

module.exports = {
  entry: "./client/src/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "./client/public")
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3, "targets": "defaults" }], "@babel/preset-react"]
          }
        }
      }
    ]
  }
}