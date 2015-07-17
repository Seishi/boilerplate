// Clean files
// ------------------------------

import rimraf from 'rimraf';

export default function (gulp) {
  return gulp.task('clean', function(cb) {
    rimraf('./dist', cb);
  });
}
