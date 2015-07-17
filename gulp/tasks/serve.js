// Create servers for development
// ------------------------------

import express from 'express';
import merge from 'lodash/object/merge';
// import open from 'open';
import favicon from 'serve-favicon';
import path from 'path';
import fs from 'fs';
import fm from 'front-matter';
import portScanner from 'portscanner-plus';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
// import livereload from 'connect-livereload';
import browserSync from 'browser-sync';
// import connectBrowserSync from 'connect-browser-sync';
import gulpConfig from '../../gulp/config';
import {devConfig} from '../../webpack.config';

export default function (gulp) {
  gulp.task('serve', ['markup'], () => {

    const names = ['devServer', 'webpackServer'];

    // Get ports that are not in use, then create servers
    portScanner.getPorts(2, 8000, 8080, names).then((ports) => {
      // Webpack dev server
      // ------------------------------
      const config = merge({}, devConfig, {
        entry: {
          app: devConfig.entry.app.concat([
            'webpack-dev-server/client?http://localhost:' + ports.webpackServer
          ])
        },
        output: {
          publicPath: 'http://localhost:' + ports.webpackServer + '/assets/'
        }
      });

      const bundler = webpack(config);

      const server = new WebpackDevServer(bundler, {
        contentBase: './dist',
        hot: true,
        // WebpackDevServer cannot get `publiPath` from  webpack.config.js. It must be set manually.
        publicPath: config.output.publicPath,
        quiet: true,
        filename: 'bundle.js',
        stats: { colors: true },
        historyApiFallback: true
      });

      server.listen(ports.webpackServer, 'localhost', function () {
        console.log('Webpack-dev-server is running at port ' + ports.webpackServer + '...');
      });


      // Express server
      // ------------------------------
      const app = express();
      const routeReg = /^\/((?:[^\/]+\/*)*)$/;

      app.set('views', './src/views');
      app.set('view engine', 'jade');
      app.use(express.static(path.join(__dirname, '../../public')));
      // app.use(connectBrowserSync(bs));
      app.use(favicon(path.join(__dirname, '../../src/favicon.ico')));

      app.get(routeReg, (req, res) => {
        let view = req.params[0];

        if (view === '' || view.slice(-1) === '/') {
          view += 'index';
        }

        fs.readFile(path.join(__dirname, '../../src/views/index.jade'), 'utf8', (err, data) => {
          if (err) { throw err; }
          const content = fm(data);

          // Block the request for favicon.ico.
          // Fetch data from config, file paths and front matter, then put them together and render the page
          if (req.url !== '/favicon.ico') {
            res.render(view, merge(gulpConfig.markup.globals, {current: {base: 'http://localhost:' + ports.webpackServer}}, content.attributes));
          }
        });

      });

      // app.use(livereload({port: ports.devServer}));
      // app.use(express.static(path.join(__dirname, '../../dist')));

      app.listen(ports.devServer, 'localhost', function () {
        // open('http://localhost:' + ports.devServer);
        // console.log('Server is running at port ' + ports.devServer + '...');
        browserSync.create()
          .init({
            proxy: `http://localhost:${ports.devServer}`
          });
      });

    })
    .catch(function (error) {
      console.log(error);
    })
    .done();

  });
}
