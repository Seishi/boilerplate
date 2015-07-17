// Webpack configurations
// ------------------------------

// Notice: You have to link the css file manually if you're using the ExtractTextPlugin.

import webpack, { DefinePlugin } from 'webpack';
import merge from 'lodash/object/merge';
import minimist from 'minimist';
import autoprefixer from 'autoprefixer-core';
import path from 'path';
// Uncomment the coming line if you want to seperate your CSS into files from bundle.js
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Get arguments from command line
const argv = minimist(process.argv.slice(2));

// Switch environments between development and production
const DEBUG = !argv.release;

// We use sourcemaps in development while we minimize the code in production
const CSS_LOADER = DEBUG ? 'css-loader?sourceMap' : 'css-loader?minimize';

// Browers Autoprefixer should take care of
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];

// Global variables
// Such code like `if(__DEV__) { ... } ` will be removed in production
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

// Common configurations
// ------------------------------

const config = {
  devtool: DEBUG ? 'source-map' : false,

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  entry: {
    app: [
      './src/app'
    ]
  },

  output: {
    path: path.join(__dirname, '/dist/assets/'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        loader: `style-loader!${CSS_LOADER}!postcss-loader`
      }, {
        test: /\.styl$/,
        // Uncomment the coming line and comment the next line if you want to seperate your CSS into files from bundle.js.
        // loader: ExtractTextPlugin.extract('style-loader', `${CSS_LOADER}!postcss-loader!stylus-loader`)
        loader: `style-loader!${CSS_LOADER}!postcss-loader!stylus-loader`
      }
    ]
  },

  postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)],

  // 插件
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new DefinePlugin(GLOBALS)
  ]
};


// Production configurations
// ------------------------------

const prodConfig = merge({}, config, {
  plugins: config.plugins.concat([
    // Uncomment the coming line if you want to seperate your CSS into files from bundle.js. BTW change the value to '[name].css' if you have couples of entry point
    // new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ])
});


// Development configurations
// ------------------------------

const devConfig = merge({}, config, {
  entry: {
    app: config.entry.app.concat([
      'webpack/hot/dev-server'
    ])
  },
  plugins: config.plugins.concat([
    // HMR
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
});


export { devConfig };
export default prodConfig;
