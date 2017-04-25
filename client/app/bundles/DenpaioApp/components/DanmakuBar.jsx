import React from 'react';
import Radium from 'radium';

@Radium
export default class DanmakuBar extends React.Component {
  sendDanmaku = (event) => {
    event.preventDefault();
    let input = this.refs.input;
    window.App.danmakuChannel.send({ message: input.value });
    input.value = '';
    input.blur();
  };

  render() {
    return (
      <form
        onSubmit={this.sendDanmaku}
        >
        <input
          ref="input"
          type="text"
          placeholder="Write a message"
          style={danmakuBarStyle}
        />
      </form>
    );
  }
}

const danmakuBarStyle = {
  backgroundColor: 'transparent',
  margin: '2px',
  border: 'none',
  maxWidth: '300px',
  height: '2em',
  'transition': '.5s',
  ':focus': {
    maxWidth: '400px',
  }
};
