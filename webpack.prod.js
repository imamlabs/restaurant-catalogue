const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 40000,
      minChunks: 1,
      maxAsyncRequests: 20,
      maxInitialRequests: 20,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 20000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        featureA: {
          test: /[\\/]src[\\/]featureA[\\/]/,
          name: 'featureA',
          minChunks: 1,
          priority: -30,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
