// Create servers for development
// ------------------------------

import merge from 'lodash/object/merge';
import portScanner from 'portscanner';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import { webpackDevConfig } from '../config';

export default function (gulp, config, $) {
  gulp.task('serve', () => {

    function createServer() {
      portScanner.checkPortStatus(config.port, '127.0.0.1', (error, status) => {
        if (status === 'open') {
          portScanner.findAPortNotInUse(8001, 8080, '127.0.0.1', function(e, port) {
            throw new Error(`Port ${config.port} is currently in use. Try \`gulp -p ${port}\` instead.`);
          });
        } else {
          // Webpack dev server
          // ------------------------------
          const webpackConfig = merge({}, webpackDevConfig, {
            entry: Object.keys(webpackDevConfig.entry).reduce(function (previous, current) {
              previous[current] = webpackDevConfig.entry[current].concat([`webpack-dev-server/client?http://localhost:${config.port}`]);
              return previous;
            }, {}),
            output: {
              publicPath: `http://localhost:${config.port}/${config.dirs.assets}/`
            }
          });

          const bundler = webpack(webpackConfig);

          const server = new WebpackDevServer(bundler, {
            contentBase: config.markup.pub,
            hot: true,
            // WebpackDevServer doesn't get `publicPath` from  webpack.config.js. It must be set manually.
            publicPath: webpackConfig.output.publicPath,
            quiet: true,
            filename: 'bundle.js',
            stats: { colors: true },
            historyApiFallback: true
          });

          server.listen(config.port, 'localhost', function () {
            $.util.log(`Webpack-dev-server is running at port ${config.port}...`);
          });

        }
      });
    }

    try {
      createServer();
    } catch (err) {
      console.log(err.toString());
    }

  });
}
