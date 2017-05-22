import React from 'react';
import MdClose from 'react-icons/lib/md/close';
import Playlist from './Playlist';
import DanmakuBar from './DanmakuBar';
import { HotKeys } from 'react-hotkeys';

export default class AppLayout extends React.Component {
  keyMap = {
    'focusDanmakuBar': 'enter',
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

  componentDidMount() {
    document.getElementById('denpaio-app').addEventListener(window.whichTransitionEvent(), function(event) {
      let target = event.target;
      target.style.transform = '';
    });
  }

  currentStyle() {
    let pathname = this.props.location.pathname;
    let defaultStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    };
    return pathname === '/' ? {} : defaultStyle;
  }

  handleCloseButton() {
    this.props.router.push('/');
  }

  closeButton() {
    let pathname = this.props.location.pathname;

    if (pathname === '/')
      return;

    return (
      <a
        className="close-button"
        onClick={this.handleCloseButton.bind(this)}>
        <MdClose />
      </a>
    );
  }

  render() {
    backgroundStyle['backgroundImage'] = `url(${this.props.route.backgroundImage})`;

    return (
      <HotKeys
        id="denpaio-app"
        ref="denpaioApp"
        keyMap={this.keyMap}
        handlers={this.handlers}
        style={backgroundStyle}>
        <canvas id="visualizer_render"></canvas>
        <header
          className="player">
          <Playlist
            router={this.props.router}
          />
        </header>
        <section
          className="container"
          style={this.currentStyle()}>
          {this.closeButton()}
          {this.props.children}
        </section>
        <footer
          className="navbar">
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
