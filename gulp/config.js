// Gulp configurations
// -------------------

import minimist from 'minimist';

// Get arguments from command line
const argv = minimist(process.argv.slice(2));

// Switch environments between development and production
const DEBUG = !argv.release;

const config = {
  lint: [
    'gulpfile.babel.js',
    'webpack.config.js',
    './gulp/**/*.js',
    './src/**/*.js'
  ],
  markup: {
    src: [
      './src/views/**/*.jade',
      '!**/_*.jade'
    ],
    dist: './dist',
    // Globals can be used directly in jade files
    globals: {
      __DEV__: DEBUG,
      siteName: 'Untitled'
    }
  }
};

export default config;
