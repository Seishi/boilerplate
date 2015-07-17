// Default task
// ------------------------------

export default function (gulp, $, argv) {
  const tasks = argv.release ? ['bundle'] : ['watch'];

  gulp.task('default', tasks);
}
