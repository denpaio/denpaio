import React from 'react';
import MdPlay from 'react-icons/lib/md/play-arrow';
import MdPause from 'react-icons/lib/md/pause';

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };

    let self = this;
    this.timerId = setInterval(function() {
      if (Date.now() > window.ping + 10000)
        self.reconnect();
    }, 5000);
  }

  componentDidMount() {
    let stream = this.refs.audio;

    stream.addEventListener('progress', () => window.ping = Date.now());
    // Fix broken progress event in Firefox 56.0
    stream.addEventListener('timeupdate', () => window.ping = Date.now());

    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext();
    window.analyser = audioCtx.createAnalyser();

    let source = audioCtx.createMediaElementSource(stream);
    let destination = audioCtx.destination;

    source.connect(window.analyser);
    window.analyser.connect(destination);

    let bufferLength = window.analyser.frequencyBinCount;
    window.dataArray = new Uint8Array(bufferLength);

    stream.addEventListener('play', function () {
      if (window.isDisabledVisualizer)
        return;
      window.drawVisual = requestAnimationFrame(window.draw);
    });

    stream.addEventListener('pause', function () {
      setTimeout(function () {
        cancelAnimationFrame(window.drawVisual);
        window.drawVisual = null;
      }, 3000);
    });
  }

  componentWillReceiveProps(nextProps) {
    let newVolume = nextProps.volume;
    this.refs.audio.volume = newVolume;
  }

  playOrPauseAudio(event) {
    let target = event.currentTarget;
    let audio = target.querySelector('audio');

    if (audio.paused) {
      this.setState({ isPlaying: true });
      audio.load();
      audio.play();
    } else {
      this.setState({ isPlaying: false });
      audio.pause();
      audio.currentTime = 0;
    }
  }

  reconnect() {
    if (!this.state.isPlaying)
      return;

    this.refs.audio.pause();
    this.refs.audio.currentTime = 0;
    this.refs.audio.load();
    this.refs.audio.play();
  }

  render() {
    return (
      <div
        style={containerStyle}
        onClick={this.playOrPauseAudio.bind(this)}>
        {
          this.state.isPlaying ?
            <MdPause style={playOrPauseButtonStyle} /> :
            <MdPlay style={playOrPauseButtonStyle} />
        }
        <audio
          id="denpaio-audio"
          preload="none"
          crossOrigin="anonymous"
          ref="audio">
          <source src="https://stream.denpa.io/denpaio.ogg" type="audio/ogg" />
          <source src="https://stream.denpa.io/denpaio.mp3" type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

const containerStyle = {
  display: 'inline-block',
  cursor: 'pointer',
};

const playOrPauseButtonStyle = {
  fontSize: '2em',
  marginLeft: '0',
  padding: '0',
};
