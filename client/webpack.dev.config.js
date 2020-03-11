const merge           = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const sass = require('sass');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common          = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      './main.js',
    ],
  },
  output: {
    path: `${__dirname}/dist`, // `dist` is the destination
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  devServer: {
    port: 8080,
    contentBase: `${__dirname}/src`,
    inline: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  devtool: 'eval-source-map',
  plugins: [
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      configOverrides: {
        defaultSeverity: 'warning',
      },
    }),
    // webpack needs to generate a html file for dev
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'React KIT',
      template: 'index.ejs',
      templateParameters: {
        head: '', // injects in head html
      },
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
    ],
  },
});
