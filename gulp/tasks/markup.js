// Generate HTML files
// ------------------------------

import merge from 'lodash/object/merge';
import jade from 'gulp-jade';
import fm from 'front-matter';
import path from 'path';
import browserSync from 'browser-sync';

export default function (gulp, config, $) {
  gulp.task('markup', ['clean'], () => {

    // Fetch data from config, file paths and front matter, then put them together
    function getData (file) {
      // Data from front matter
      const content = fm(String(file.contents));
      let current = {};
      let relativePath = '';

      if (config.debug) {
        current.base = `http://localhost:${config.port}/`;
      } else {
        relativePath = path.relative(path.dirname(file.path), path.join(__dirname, '../../src/views'));
        current.base = relativePath ? `${relativePath}/` : '';
      }

      file.contents = new Buffer(content.body);

      // current.source = path.basename(file.path, '.jade');

      return merge({}, config.markup.globals, {current: current}, content.attributes);
    }

    gulp.src(config.markup.src)
      .pipe($.plumber())
      .pipe($.data(getData))
      .pipe(jade({
        pretty: '  '
      }))
      .pipe(gulp.dest(config.markup.dest))
      .pipe(browserSync.reload({
        stream: true,
        once: true
      }));
  });
}
