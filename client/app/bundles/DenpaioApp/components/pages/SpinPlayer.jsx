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
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  updatePreviewAudioIcon = (event) => {
    let target = event.currentTarget;
    let isPlaying = !target.paused;
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
