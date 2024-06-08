const { resolve } = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { WebpackConfigDumpPlugin } = require('webpack-config-dump-plugin');

// const WebpackConfigDump = new WebpackConfigDumpPlugin();

const ESLint = new ESLintPlugin({
  overrideConfigFile: resolve('./.eslintrc.js'),
  context: resolve('./src'),
  files: ['**/*.ts', '**/*.tsx'],
});

const MiniCssExtract = new MiniCssExtractPlugin({
  //filename: 'css/[id].[contenthash].css',
  chunkFilename: 'css/[id].[contenthash].css',
});

const BundleAnalyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  openAnalyzer: true,
  generateStatsFile: true,
});

module.exports = [
  ESLint,
  MiniCssExtract,
  BundleAnalyzer /* , WebpackConfigDump */,
];
