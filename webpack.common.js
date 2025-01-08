const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CONFIG = require('./src/scripts/globals/CONFIG');
const isProduction = process.env.NODE_ENV === 'production';
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');


module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['/heros/'],
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(CONFIG),
    }),
    ...(isProduction
      ? [
        new WorkboxWebpackPlugin.InjectManifest({
          swSrc: './src/scripts/sw.js',
          swDest: 'sw.bundle.js',
        }),
      ]
      : [
        new WorkboxWebpackPlugin.GenerateSW({
          swDest: 'sw.bundle.js',
          runtimeCaching: [
            {
              urlPattern: new RegExp(CONFIG.BASE_URL),
              handler: 'NetworkFirst',
              options: {
                cacheName: CONFIG.CACHE_NAME,
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: new RegExp(CONFIG.BASE_IMAGE_URL.SMALL),
              handler: 'CacheFirst',
              options: {
                cacheName: 'restaurant-images-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
          ],
        }),
      ]),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/i,
          options: {
            quality: 50,
          },
        },
      ],
      overrideExtension: true,
    }),
  ],
};
