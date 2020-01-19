const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'public/src/js/app.js'),
  watch: false,
  output: {
    path: path.join(__dirname, 'public/src/dist'),
    publicPath: '/dist/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'app')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      query: {
        presets: [
          ["@babel/env", {
            "targets": {
              "browsers": "last 2 chrome versions"
            }
          }]
        ]
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  //devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/public/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  }
};