// Uint test
// ------------------------------

// import isparta from 'isparta';     // 'import' doesn't work.
const isparta = require('isparta');   // 'require' works. It's werid.

export default function (gulp, config, $) {
  gulp.task('test', (cb) => {
    gulp.src(config.scripts.src)
      .pipe($.istanbul({
        instrumenter: isparta.Instrumenter,
        // includeUntested: true,
        babel: { stage: 0 }
      }))
      .pipe($.istanbul.hookRequire())
      .on('finish', () => {
        gulp.src(config.test.src)
          .pipe($.plumber())
          .pipe($.mocha({
            reporter: 'spec'
          }))
          .pipe($.istanbul.writeReports({
            dir: './coverage',
            reportOpts: { dir: './coverage' },
            reporters: ['text', 'text-summary', 'json', 'lcov']
          }))
          .pipe($.istanbul.enforceThresholds({
            thresholds: {
              // statements: 80,
              // branches: 50,
              // lines: 80,
              // functions: 50,
              global: 90
            }
          }))
          .on('end', cb);
      });
  });
}
