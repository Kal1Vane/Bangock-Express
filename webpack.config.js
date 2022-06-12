const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development", // мод сборки
  entry: { // какие файлы брать
    main: ["@babel/polyfill","./index.js"]
  },
  output: { // куда выбрасывает бандл
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: { // сокращенный путь для модулей и вебпака
        "@models": path.resolve(__dirname, "src/models"),
        "@": path.resolve(__dirname, "src"),
        "@images": path.resolve(__dirname, "src/img")
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  devServer: {
    port: 4200
  },
  plugins: [ // разные плагины
    new HTMLWebpackPlugin({
      template: "./index.html"
    }),
    new CleanWebpackPlugin()
  ],
  module: { // то какие файлы читать и что с ними делать какие плагины использовать
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: "asset/resource"
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource"
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          options: {
            presets: ['@babel/preset-env']
          },
          loader: "babel-loader"
        }
      }
    ]
  }
}