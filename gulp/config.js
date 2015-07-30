// Gulp configurations
// -------------------

import nib from 'nib';
import path from 'path';
import minimist from 'minimist';
import merge from 'lodash/object/merge';
import autoprefixer from 'autoprefixer-core';
import webpack, { DefinePlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Grab arguments from command line
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

// Seperate CSS into files or not
const EXTRACT_CSS = true;

// Global variables for debugging scripts
// Such code like `if(__DEV__) { ... } ` will be removed in production
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

// Global variables for generating jade into html
const TEMPLATE_GLOBALS = {
  __DEV__: DEBUG,
  siteName: 'Untitled'
};


// Gulp task config
// ------------------------------

const dirs = {
  pub: 'public',
  dist: 'dist',
  assets: 'assets'
};

const config = {
  port: argv.p || 8000,

  dirs: dirs,

  debug: DEBUG,
  verbose: !!argv.verbose,

  lint: {
    // Turn this on if you want to run the lint task during developing
    enable: false,
    files: [
      'gulpfile.babel.js',
      'webpack.config.js',
      './gulp/**/*.js',
      './src/**/*.js'
    ]
  },

  browserSync: {
    server: {
      baseDir: DEBUG ? `./${dirs.pub}` : `./${dirs.dist}`
    }
  },

  markup: {
    src: [
      './src/views/**/*.jade',
      '!**/_*.jade'
    ],
    dest: DEBUG ? `./${dirs.pub}` : `./${dirs.dist}`,
    // Globals can be used directly in template files
    globals: TEMPLATE_GLOBALS
  }
};


// Common configurations
// ------------------------------

const webpackConfig = {
  devtool: DEBUG ? 'source-map' : false,

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  entry: {
    app: ['./src/app']
  },

  output: {
    filename: '[name].js'
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
        loader: EXTRACT_CSS && !DEBUG ? ExtractTextPlugin.extract('style-loader', `${CSS_LOADER}!postcss-loader!stylus-loader`) : `style-loader!${CSS_LOADER}!postcss-loader!stylus-loader`
      }, {
        test: /\.(eot|ttf|woff|woff2|svg|otf)$/,
        loader: 'file?name=fonts/[name].[ext]'
      }, {
        test: /\.png/,
        loader: 'url-loader?limit=5120&mimetype=image/png'
      }, {
        test: /\.jpg/,
        loader: 'url-loader?limit=5120&mimetype=image/jpg'
      }, {
        test: /\.gif/,
        loader: 'url-loader?limit=5120&mimetype=image/gif'
      }
    ]
  },

  stylus: {
    use: nib()
  },

  postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)],

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new DefinePlugin(GLOBALS)
  ]
};


// Production configurations
// ------------------------------

const webpackProdConfig = merge({}, webpackConfig, {
  output: {
    path: path.join(__dirname, '..', dirs.dist, dirs.assets)
  },
  plugins: webpackConfig.plugins
    .concat(EXTRACT_CSS ? [new ExtractTextPlugin('[name].css')] : [])
    .concat([
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

const webpackDevConfig = merge({}, webpackConfig, {
  entry: Object.keys(webpackConfig.entry).reduce(function (previous, current) {
    previous[current] = webpackConfig.entry[current].concat(['webpack/hot/dev-server']);
    return previous;
  }, {}),
  output: {
    path: path.join(__dirname, '..', dirs.pub, dirs.assets)
  },
  plugins: webpackConfig.plugins.concat([
    // HMR
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
});

export default config;
export { webpackDevConfig };
export { webpackProdConfig };
