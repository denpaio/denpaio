import React from 'react';
import Radium from 'radium';

@Radium
export default class DanmakuBar extends React.Component {
  sendDanmaku = (event) => {
    event.preventDefault();
    let input = this.refs.input;
    let text = input.value.trim();
    if (text)
      window.App.danmakuChannel.send({ message: text });
    input.value = '';
    if (!text)
      input.blur();
  };

  render() {
    return (
      <form
        id="danmaku-form"
        onSubmit={this.sendDanmaku}
        tabIndex="-1"
        style={{outline: 'none'}}
        >
        <input
          id="danmaku-input"
          ref="input"
          type="text"
          placeholder="Write a message"
          maxLength="100"
          style={danmakuBarStyle}
        />
        <div
          id="danmaku-history-overlay"
          style={danmakuHistoryOverlayStyle}>
          <ul
            id="danmaku-history-container"
            style={danmakuHistoryContainerStyle}>
          </ul>
        </div>
      </form>
    );
  }
}

const danmakuBarStyle = {
  backgroundColor: 'transparent',
  margin: '2px',
  border: 'none',
  width: '320px',
  maxWidth: '98%',
  height: '2em',
  'transition': '.5s',
  ':focus': {
    width: '400px',
  }
};

const danmakuHistoryOverlayStyle = {
  position: 'absolute',
  bottom: '3em',
  left: '.5em',
  right: '0',
};

const danmakuHistoryContainerStyle = {
  maxHeight: '40vh',
  overflowY: 'scroll',
  margin: '0',
};
