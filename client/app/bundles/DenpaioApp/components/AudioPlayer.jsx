import React from 'react';
import MdPlay from 'react-icons/lib/md/play-arrow';
import MdPause from 'react-icons/lib/md/pause';

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };

    let self = this;
    this.timerId = setInterval(function() {
      if (Date.now() > window.ping + 10000)
        self.reconnect();
    }, 5000);
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
    if (!this.audio)
      return;

    if (this.state.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.load();
      this.audio.play();
    }
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
          preload="none"
          ref={(audio) => {
            if (audio) {
              this.audio = audio;
              this.audio.volume = 0.7;
              this.audio.addEventListener('progress', () => window.ping = Date.now());
            }
          }}>
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
