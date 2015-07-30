// Clean files
// ------------------------------

import rimraf from 'rimraf';

export default function (gulp, config) {
  return gulp.task('clean', function(cb) {
    rimraf(config.markup.dest, cb);
  });
}
