import './Loading.styl';

class Loading {
  run () {
    document.querySelector('body').innerHTML += '<div class="loading"></div>';
  }
}

export default Loading;
