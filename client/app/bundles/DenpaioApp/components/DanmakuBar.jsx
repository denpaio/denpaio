import React from 'react';
import Radium from 'radium';

import DanmakuHistory from './DanmakuHistory';

class DanmakuBar extends React.Component {
  sendDanmaku = (event) => {
    event.preventDefault();
    let input = this.refs.input;
    let text = input.value.trim();
    if (text)
      window.App.danmakuChannel.send({ action: 'create', message: text });
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
        style={danmakuFormStyle}
        >
        <input
          id="danmaku-input"
          ref="input"
          type="text"
          placeholder="Write a message"
          maxLength="100"
          style={danmakuBarStyle}
        />
        <DanmakuHistory
          showDanmakuHistory={this.props.showDanmakuHistory}
        />
      </form>
    );
  }
}

const danmakuFormStyle = {
  display: 'inline-block',
  ':focus': {
    outline: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
};

const danmakuBarStyle = {
  backgroundColor: 'transparent',
  margin: '0.2em',
  border: 'none',
  width: '320px',
  maxWidth: '98%',
  height: '2em',
  boxShadow: 'inset 0 1px 2px rgba(254, 254, 254, 0.1)',
  'transition': '0.5s',
  ':focus': {
    width: '400px',
    boxShadow: '0 0 5px #cacaca',
  },
};

export default Radium(DanmakuBar);
