import './Example.styl';
import Test from '../Test/Test';

class Example {
  run () {
    if (__DEV__) {
      console.log('Developing...');
    }

    document.querySelector('.test')
      .innerHTML = 'Buddy';

    const test = new Test();
    test.run();
  }
}

export default Example;
