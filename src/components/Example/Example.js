import './Example.styl';
import Loading from '../Loading/Loading';

class Example {
  run () {
    if (__DEV__) {
      console.log('Developing...');
    }

    document.querySelector('.test')
      .innerHTML = 'Buddy';

    const loading = new Loading();
    loading.run();
  }
}

export default Example;
