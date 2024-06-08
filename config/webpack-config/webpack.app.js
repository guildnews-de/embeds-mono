const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  target: 'web',
  output: {
    filename: 'gw2emb_[name].js',
  },
});
