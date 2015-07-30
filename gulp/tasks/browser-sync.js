// Livereload
// ------------------------------

import browserSync from 'browser-sync';

export default function (gulp, config) {
  gulp.task('browser-sync', () => {
    browserSync(config.browserSync);
  });
}
