// Watch files' changes
// ------------------------------

// import browserSync from 'browser-sync';

export default function (gulp, config, $) {
  gulp.task('watch', () => {

    if (config.lint.enable) {
      $.watch(config.lint.files, () => {
        gulp.start('lint');
      });
    }

    $.watch(config.markup.src, () => {
      gulp.start('markup');
    });

  });
}
