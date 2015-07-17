// Generate HTML files
// ------------------------------

import merge from 'lodash/object/merge';
import jade from 'gulp-jade';
import fm from 'front-matter';
import path from 'path';

export default function (gulp, $, config) {
  gulp.task('markup', function() {

    // Fetch data from config, file paths and front matter, then put them together
    function getData (file) {
      // Data from front matter
      const content = fm(String(file.contents));
      let current = {};

      file.contents = new Buffer(content.body);

      // current.source = path.basename(file.path, '.jade');
      current.base = path.relative(path.dirname(file.path), path.join(__dirname, '../../src/views'));

      return merge({}, config.markup.globals, {current: current}, content.attributes);
    }

    gulp.src(config.markup.src)
      .pipe($.plumber())
      .pipe($.data(getData))
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest(config.markup.dist));
  });
}
