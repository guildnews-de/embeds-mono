const { resolve } = require('path');
// const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
// const { WebpackConfigDumpPlugin } = require('webpack-config-dump-plugin');

// const WebpackConfigDump = new WebpackConfigDumpPlugin();

// const ESLint = new ESLintPlugin({
//   overrideConfigFile: resolve('./.eslintrc.js'),
//   context: resolve('./src'),
//   files: ['**/*.ts', '**/*.tsx'],
// });

const MiniCssExtract = new MiniCssExtractPlugin({
  //filename: 'css/[id].[contenthash].css',
  chunkFilename: 'css/[id].[contenthash].css',
});

const BundleAnalyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  openAnalyzer: false,
  generateStatsFile: true,
});

const Copy = new CopyPlugin({
  patterns: [{ from: 'public', to: '' }],
});

const Define = new DefinePlugin({
  'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
});

module.exports = [
  // ESLint,
  MiniCssExtract,
  BundleAnalyzer,
  // WebpackConfigDump,
  Copy,
  Define,
];
