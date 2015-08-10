// Gulp entry
// ------------------------------

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

// Configurations
import config from './gulp/config';

// Import tasks
import taskLint from './gulp/tasks/lint';
import taskTest from './gulp/tasks/test';
import taskWatch from './gulp/tasks/watch';
import taskServe from './gulp/tasks/serve';
import taskClean from './gulp/tasks/clean';
import taskMarkup from './gulp/tasks/markup';
import taskBundle from './gulp/tasks/bundle';
import taskDefault from './gulp/tasks/default';
import taskBrowserSync from './gulp/tasks/browser-sync';

const $ = gulpLoadPlugins();

// Tasks
// ------------------------------

taskLint(gulp, config, $);

taskTest(gulp, config, $);

taskClean(gulp, config);

taskServe(gulp, config, $);

taskWatch(gulp, config, $);

taskMarkup(gulp, config, $);

taskBundle(gulp, config, $);

taskDefault(gulp, config, $);

taskBrowserSync(gulp, config);
