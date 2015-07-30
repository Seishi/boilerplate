// Gulp entry
// ------------------------------

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

// Configurations
import config from './gulp/config';

// Import tasks
import taskLint from './gulp/tasks/lint';
import taskWatch from './gulp/tasks/watch';
import taskDefault from './gulp/tasks/default';
import taskServe from './gulp/tasks/serve';
import taskBrowserSync from './gulp/tasks/browser-sync';
import taskClean from './gulp/tasks/clean';
import taskBundle from './gulp/tasks/bundle';
import taskMarkup from './gulp/tasks/markup';

const $ = gulpLoadPlugins();

// Tasks
// ------------------------------

taskClean(gulp, config);

taskLint(gulp, config, $);

taskMarkup(gulp, config, $);

taskBundle(gulp, config, $);

taskServe(gulp, config, $);

taskBrowserSync(gulp, config);

taskWatch(gulp, config, $);

taskDefault(gulp, config, $);
