// const { resolve } = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  target: 'web',
  output: {
    filename: '[name].js',
  },
});
