const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  context: `${__dirname}/src`, // `__dirname` is root of project and `src` is source
  resolve: {
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.ts', '.tsx', '.scss'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      beforeEmit: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/, // Check for all js, ts, tsx files
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        // options: {
        //   presets: ['@babel/typescript', '@babel/preset-env', '@babel/preset-react'],
        //   cacheDirectory: true,
        // },
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: [
          path.resolve(__dirname, 'src/assets/figma-react'),
        ],
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [
          path.resolve(__dirname, 'src/assets/figma-react'),
        ],
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(gif|png|jpg)$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
};

module.exports = config;
