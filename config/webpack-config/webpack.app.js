const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  target: 'web',
  output: {
    filename: 'index.js',
  },
});
