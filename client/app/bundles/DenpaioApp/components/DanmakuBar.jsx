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
          maxLength="100"
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
  width: '320px',
  maxWidth: '98%',
  height: '2em',
  'transition': '.5s',
  ':focus': {
    width: '400px',
  }
};
