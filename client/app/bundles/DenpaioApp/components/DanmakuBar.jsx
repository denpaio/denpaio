import React from 'react';
import Radium from 'radium';

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

  currentDanmakuHistoryWrapperStyle() {
    const defaultStyle = {
      position: 'absolute',
      bottom: '2.5em',
      left: '0',
      right: '0',
      overflow: 'hidden',
    };

    if (!this.props.showDanmakuHistory) {
      return Object.assign({}, defaultStyle, { display: 'none' });
    }

    return defaultStyle;
  }

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
        <div
          id="danmaku-history-wrapper"
          style={this.currentDanmakuHistoryWrapperStyle()}>
          <ul
            id="danmaku-history-container"
            style={danmakuHistoryContainerStyle}>
          </ul>
        </div>
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

const danmakuHistoryContainerStyle = {
  width: 'calc(100% + 17px)',
  maxHeight: '40vh',
  overflow: 'hidden',
  overflowY: 'auto',
  margin: '0 0.5em',
  padding: '0',
  listStyleType: 'none',
};

export default Radium(DanmakuBar);
