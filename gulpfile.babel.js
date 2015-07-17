// Gulp entry
// ------------------------------

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import minimist from 'minimist';

import config from './gulp/config';

// Import tasks
import taskLint from './gulp/tasks/lint';
import taskWatch from './gulp/tasks/watch';
import taskDefault from './gulp/tasks/default';
import taskServe from './gulp/tasks/serve';
import taskClean from './gulp/tasks/clean';
import taskBundle from './gulp/tasks/bundle';
import taskMarkup from './gulp/tasks/markup';

const $ = gulpLoadPlugins();

// Get arguments from command line
const argv = minimist(process.argv.slice(2));


// Tasks
// ------------------------------

taskServe(gulp);

taskClean(gulp);

taskLint(gulp, $, config);

taskWatch(gulp, $, config);

taskMarkup(gulp, $, config, argv);

taskBundle(gulp, $, argv);

taskDefault(gulp, $, argv);
