import Example from './components/Example/Example';

if (module.hot) {
  module.hot.accept();
}

const example = new Example();
example.run();
