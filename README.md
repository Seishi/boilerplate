## Developing guide

### Getting started

```
git clone git@github.com:Seishi/boilerplate.git <your project name>
cd <your project name>
npm install
```

### Structure

```
.
├── dist                        // Distribution folder
│   ├── assets
│   │   ├── app.css
│   │   └── app.js
│   └── index.html
├── gulp                        // Gulp configurations and tasks
│   ├── config.js
│   └── tasks
│       ├── browser-sync.js
│       ├── bundle.js
│       ├── clean.js
│       ├── default.js
│       ├── lint.js
│       ├── markup.js
│       ├── serve.js
│       ├── test.js
│       └── watch.js
├── gulpfile.babel.js           // Gulp entrance
├── node_modules                // Node modules
├── package.json
├── public                      // Temporary folder for development
│   └── index.html
└── src                         // Sources
    ├── app.js
    ├── components
    │   └── TodoList
    │       ├── Task.js
    │       └── TaskList.js
    └── views
        ├── _layout.jade
        └── index.jade
```

### Develop

Run：

```bash
gulp
```

Your browser will be opened and located to `http://localhost:3000` automatically.

### Release

Just run:

```bash
gulp --release
```

You can find the results in the `dist` directory.
