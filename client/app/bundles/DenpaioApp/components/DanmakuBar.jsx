import React from 'react';
import Radium from 'radium';

@Radium
export default class DanmakuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendDanmaku = (e) => {
    e.preventDefault();
    var danmakubar = e.target.danmakubar;
    danmakubar.value = '';
    danmakubar.blur();
  };

  render() {
    return (
      <form
        onSubmit={this.sendDanmaku}
        >
        <input
          name="danmakubar"
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
