const webpack = require('webpack');
const merge = require('webpack-merge');
const productionCommon = require('./webpack.common.production.js');

module.exports = merge(productionCommon, {
  plugins: [
    new webpack.DefinePlugin({
      __BASE_URL__: JSON.stringify('{{&url}}'),
      __ENV__: JSON.stringify('{{&env}}{{^env}}staging{{/env}}'),
      __DEBUG__: {{&debug}}{{^debug}}false{{/debug}}, // disable for production
    }),
  ],
});
