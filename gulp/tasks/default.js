// Default task
// ------------------------------

export default function (gulp, config, $) {
  gulp.task('default', (cb) => {
    if (config.debug) {
      $.sequence('serve', 'markup', 'browser-sync', 'watch', cb);
    } else {
      $.sequence('markup', 'bundle', 'browser-sync', cb);
    }
  });
}
