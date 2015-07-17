// Watch files
// ------------------------------

export default function (gulp, $, config) {
  gulp.task('watch', ['serve'], () => {
    $.watch(config.lint, () => {
      gulp.start('lint');
    });

    $.watch(config.markup.src, () => {
      gulp.start('markup');
    });
  });
}
