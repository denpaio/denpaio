import React from 'react';
import Playlist from './Playlist';
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

  render() {
    backgroundStyle['backgroundImage'] = `url(${this.props.route.backgroundImage})`;

    return (
      <HotKeys
        id="denpaio-app"
        keyMap={this.keyMap}
        handlers={this.handlers}
        style={backgroundStyle}>
        <header className="player">
          <Playlist
            router={this.props.router}
          />
        </header>
        <section className="container" style={this.currentStyle()}>
          {this.props.children}
        </section>
        <footer className="navbar">
          <DanmakuBar
            ref="danmakubar"
          />
        </footer>
      </HotKeys>
    );
  }
}

const backgroundStyle = {
  backgroundSize: 'cover',
  backgroundPosition: '50% 30%',
};
