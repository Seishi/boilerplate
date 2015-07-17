// Lint the code with eslint
// ------------------------------

export default function (gulp, $, config) {
  gulp.task('lint', () => {
    return gulp.src(config.lint)
      .pipe($.eslint())
      .pipe($.eslint.format());
  });
}
