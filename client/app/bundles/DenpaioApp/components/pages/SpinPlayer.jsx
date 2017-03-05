import React from 'react';
import FaPlayCircle from 'react-icons/lib/fa/play-circle';
import FaPauseCircle from 'react-icons/lib/fa/pause-circle';

export default class SpinPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
    this.eventListenerEventNames = ['play', 'pause'];
  }

  componentWillUnmount() {
    this.eventListenerEventNames.forEach((eventName) => {
      this.audio.removeEventListener(eventName, this.updatePreviewAudioIcon);
    });
  }

  playOrPausePreviewAudio(event) {
    let target = event.currentTarget;
    let audio = target.querySelector('audio');
    let audios = document.querySelectorAll('.container audio');
    if (audio.paused) {
      audios.forEach((el) => el.pause());
      audio.play();
    } else {
      audio.pause();
    }
  }

  updatePreviewAudioIcon = (event) => {
    let audio = event.currentTarget;
    let isPlaying = !audio.paused;
    if (audio.paused)
      audio.currentTime = 0;
    this.setState({isPlaying});
  }

  render() {
    return (
      <a
        style={{color: '#FFFFFF', fontSize: 'larger'}}
        onClick={this.playOrPausePreviewAudio.bind(this)}>
        { this.state.isPlaying ? <FaPauseCircle /> : <FaPlayCircle /> }
        <audio
          src={this.props.src}
          preload="none"
          ref={(audio) => audio && this.eventListenerEventNames.forEach((eventName) => {
            this.audio = audio;
            this.audio.addEventListener(eventName, this.updatePreviewAudioIcon);
          })}
        />
      </a>
    );
  }
}
