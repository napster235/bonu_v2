const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
const sass = require('sass');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let output_folder = path.resolve(__dirname, '..', 'public');

if (process.env.OUTPUT_PATH) {
  output_folder = path.resolve(__dirname, process.env.OUTPUT_PATH);
}

const extractSass = new MiniCssExtractPlugin({
  filename: '[name].[chunkhash].css',
  disable: false,
});

const plugins = [
  extractSass,
  new webpack.DefinePlugin({
    'process.env': { // this var is used by packages to switch to prod
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.HashedModuleIdsPlugin(),
  new OptimizeCSSAssetsPlugin({}),
  new HtmlWebpackPlugin({ // we generate an erb that will rendered by rails and will add our variables in window.ENV
    filename: 'index.html.erb',
    title: 'React KIT',
    template: 'index.ejs',
    templateParameters: {
      head: '<%= javascript_tag(" ENV = #{Settings.ui_config.to_json}; ") %>', // injects in head html
    },
  }),
];

if (process.env.ANALYZE_BUILD) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
  }));
}

let terserCompress;
// 95% of size optimization is done by mangle, so we can disable some compression
if (process.env.FAST_BUILD) {
  terserCompress = {
    arrows: false,
    booleans: false,
    collapse_vars: false,
    comparisons: false,
    computed_props: false,
    hoist_funs: false,
    hoist_props: false,
    hoist_vars: false,
    if_return: false,
    inline: false,
    join_vars: false,
    keep_infinity: true,
    loops: false,
    negate_iife: false,
    properties: false,
    reduce_funcs: false,
    reduce_vars: false,
    sequences: false,
    side_effects: false,
    switches: false,
    top_retain: false,
    toplevel: false,
    typeofs: false,
    // Setting this to false leads to weird behaviour
    // unused: false,
    // Switch off all types of compression except those needed to convince
    // react-devtools that we're using a production build
    conditionals: true,
    dead_code: true,
    evaluate: true,
  };
}

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJsPlugin({
      terserOptions: {
        // cache: true, // cache should be activated only for local deploys with capistrano, where it would make sense
        chunkFilter: (chunk) => {
          // Exclude uglification for the `vendor` chunk
          if (chunk.name === 'vendor') {
            return false;
          }
          return true;
        },
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        mangle: true,
        compress: terserCompress,
      },
    })],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  entry: {
    app: [
      './main.js',
    ],
  },
  output: {
    path: output_folder,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  devtool: 'source-map', // Default development sourcemap
  plugins,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
          loader: 'sass-loader',
          options: {
            implementation: sass,
          },
        }],
      },
    ],
  },

});
