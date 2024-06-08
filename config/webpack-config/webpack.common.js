const { resolve } = require('path');
const plugins = require('./plugins');
const loaders = require('./loaders');

const config = {
  entry: './src/index.ts',
  output: {
    path: resolve('./dist'),
    chunkFilename: 'js/[id].[contenthash].js',
    assetModuleFilename: 'assets/[contenthash][ext]',
    hashDigestLength: 16,
    clean: true,
  },
  plugins: plugins,
  module: {
    rules: loaders,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
  performance: {
    maxAssetSize: 512000,
  },
};

module.exports = config;
