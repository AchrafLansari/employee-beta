const path = require('path')
const webpack =require('webpack')

const app_config = {
  devtool: 'none',
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, './src/public/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, './src/public/dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['cache-loader', 'babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: ['cache-loader', 'style-loader', 'css-loader'],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
  ],
}

module.exports = [app_config]
