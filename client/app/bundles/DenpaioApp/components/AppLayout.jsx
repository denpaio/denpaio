import React from 'react';
import SearchBar from './SearchBar';
import DanmakuBar from './DanmakuBar';
import { HotKeys } from 'react-hotkeys';

export default class AppLayout extends React.Component {
  keyMap = {
    'focusDanmakuBar': 'enter'
  };

  handleFocusDanmakuBar = (event) => {
    event.stopPropagation();
    if (event.target === document.activeElement &&
       (!document.hasFocus || document.hasFocus()) &&
       !!(event.target.type || event.target.href || ~event.target.tabIndex)
    )
      return;
    let self = this;
    setTimeout(function() {
      self.refs.danmakubar.refs.input.focus();
    }, 0);
  };

  handlers = {
    'focusDanmakuBar': this.handleFocusDanmakuBar
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  currentStyle() {
    let pathname = this.props.location.pathname;
    let defaultStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    };
    return pathname === '/' ? {} : defaultStyle;
  }

  handleSearch = (keyword) => {
    this.setState({ keyword });
    this.props.router.push(`/search?q=${keyword}`);
  };

  render() {
    backgroundStyle['backgroundImage'] = `url(${this.props.route.backgroundImage})`;

    return (
      <HotKeys
        id="denpaio-app"
        keyMap={this.keyMap}
        handlers={this.handlers}
        style={backgroundStyle}>
        <header className="player">
          <audio preload="none" controls>
            <source src="https://stream.denpa.io/denpaio.ogg" type="audio/ogg" />
            <source src="https://stream.denpa.io/denpaio.mp3" type="audio/mpeg" />
          </audio>
          <SearchBar
            onSearch={this.handleSearch}
          />
        </header>
        <section className="container" style={this.currentStyle()}>
          {this.props.children}
        </section>
        <footer className="navbar">
          <DanmakuBar
            ref="danmakubar"
          />
          <div
            style={danmakuHistoryStyle}>
            <ul
              id="danmaku_history"
              style={danmakuContainerStyle}>
            </ul>
          </div>
        </footer>
      </HotKeys>
    );
  }
}

const backgroundStyle = {
  backgroundSize: 'cover',
  backgroundPosition: '50% 30%',
};

const danmakuHistoryStyle = {
  position: 'absolute',
  bottom: '2.1em',
  left: '0',
  right: '0',
  padding: '4px 8px',
  backgroundColor: 'rgba(0,0,0,0.5)',
  fontSize: 'large',
};

const danmakuContainerStyle = {
  height: '40vh',
  overflowY: 'scroll',
};
