// Bundle scripts
// ------------------------------

import webpack from 'webpack';
import express from 'express';
import open from 'open';
import portScanner from 'portscanner-plus';
import config from '../../webpack.config.js';

export default function (gulp, $, argv) {
  gulp.task('bundle', ['clean'], cb => {
    const bundler = webpack(config);
    const verbose = !!argv.verbose;

    function bundle(err, stats) {
      if (err) {
        throw new $.util.PluginError('webpack', err);
      }

      // Print the results
      console.log(stats.toString({
        colors: $.util.colors.supportsColor,
        hash: verbose,
        version: verbose,
        timings: verbose,
        chunks: verbose,
        chunkModules: verbose,
        cached: verbose,
        cachedAssets: verbose
      }));

      // Get a port that is not in use, then create server
      portScanner.getPorts(1, 8000, 8080).then((ports) => {

        // Create a server for production preview
        const app = express();

        app.use(express.static('./dist'));

        app.listen(ports[0], 'localhost', function () {
          open('http://localhost:' + ports[0]);
          console.log('Server is running at port ' + ports[0] + '...');
        });
      });

      return cb();
    }

    gulp.start('markup');

    // Run the bundle function
    bundler.run(bundle);

  });
}
