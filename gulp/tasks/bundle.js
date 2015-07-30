// Bundle scripts
// ------------------------------

import webpack from 'webpack';
import { webpackProdConfig } from '../config';

export default function (gulp, config, $) {
  gulp.task('bundle', cb => {
    const bundler = webpack(webpackProdConfig);

    function bundle(err, stats) {
      if (err) {
        throw new $.util.PluginError('webpack', err);
      }

      // Print the results
      console.log(stats.toString({
        colors: $.util.colors.supportsColor,
        hash: config.verbose,
        version: config.verbose,
        timings: config.verbose,
        // chunks: config.verbose,
        chunkModules: config.verbose,
        cached: config.verbose,
        cachedAssets: config.verbose
      }));

      return cb();
    }

    // Bundle!
    bundler.run(bundle);

  });
}
