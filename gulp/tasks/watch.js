// Watch files' changes
// ------------------------------

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

    $.watch(config.test.src.concat([`./${config.dirs.src}/**/*.js`]), () => {
      gulp.start('test');
    });

  });
}
