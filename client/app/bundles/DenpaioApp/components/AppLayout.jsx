import React from 'react';
import Radium from 'radium';

import MdClose from 'react-icons/lib/md/close';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import MdFavorite from 'react-icons/lib/md/favorite';
import MdPlaylistPlay from 'react-icons/lib/md/playlist-play';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaFacebook from 'react-icons/lib/fa/facebook-official';
import FaYouTube from 'react-icons/lib/fa/youtube-play';
import FaAdjust from 'react-icons/lib/fa/adjust';
import FaComment from 'react-icons/lib/fa/comment-o';
import FaGitHub from 'react-icons/lib/fa/github';

import Playlist from './Playlist';
import DanmakuBar from './DanmakuBar';
import { HotKeys } from 'react-hotkeys';

@Radium
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

    this.state = {
      isShowDanmakuHistory: true,
    };
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

  currentToggleAudioVisualizer() {
    let defaultStyle = {
      color: '#fefefe',
      cursor: 'pointer'
    };

    if (window.isDisabledVisualizer) {
      return Object.assign(defaultStyle, { color: '#666' });
    }

    return defaultStyle;
  }

  currentToggleDanmakuMessages() {
    let defaultStyle = {
      color: '#fefefe',
      cursor: 'pointer'
    };

    if (window.isDisabledDanmakuMessage) {
      return Object.assign(defaultStyle, { color: '#666' });
    }

    return defaultStyle;
  }

  currentDanmakuHistoryToggleButtonTag() {
    let isShowDanmakuHistory = this.state.isShowDanmakuHistory;

    if (isShowDanmakuHistory) {
      return <FaAngleDown style={{ fontSize: '2em' }} />;
    } {
      return <FaAngleUp style={{ fontSize: '2em' }} />;
    }
  }

  handleCloseButton() {
    this.props.router.push('/');
  }

  handleLikeButton() {
    window.App.danmakuChannel.send({ message: '❤️' });
  }

  handleToggleDanmakuHistory() {
    let isShowDanmakuHistory = this.state.isShowDanmakuHistory;
    this.setState({ isShowDanmakuHistory: !isShowDanmakuHistory });
  }

  handleToggleAudioVisualizer() {
    if (window.isDisabledVisualizer) {
      window.isDisabledVisualizer = false;
      window.drawVisual = requestAnimationFrame(window.draw);
    } else {
      window.isDisabledVisualizer = true;
      cancelAnimationFrame(window.drawVisual);
      window.drawVisual = null;
      window.resizeCanvas();
    }
    this.setState({});
  }

  handleToggleDanmakuMessages() {
    if (window.isDisabledDanmakuMessage) {
      window.isDisabledDanmakuMessage = false;
    } else {
      window.isDisabledDanmakuMessage = true;
    }
    this.setState({});
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
          <button
            onClick={this.handleLikeButton.bind(this)}
            title="Like it!"
            style={likeButtonStyle}>
            <MdFavorite
              style={{ fontSize: '1.5em' }}
            />
          </button>
          <DanmakuBar
            ref="danmakubar"
            showDanmakuHistory={this.state.isShowDanmakuHistory}
          />
          <div
            style={{ display: 'inline-block', textAlign: 'right' }}>
            <a
              href="denpaio.m3u"
              title="M3U playlist"
              style={{ color: '#fefefe' }}>
              <MdPlaylistPlay
                style={{ fontSize: '2em' }}
              />
            </a>
            <a
              href="https://twitter.com/denpaio"
              target="_blank"
              title="Twitter"
              style={{ color: '#fefefe' }}>
              <FaTwitter
                style={{ fontSize: '2em' }}
              />
            </a>
            <a
              href="https://www.facebook.com/denpaio/"
              target="_blank"
              title="Facebook"
              style={{ color: '#fefefe' }}>
              <FaFacebook
                style={{ fontSize: '2em' }}
              />
            </a>
            <a
              href="https://github.com/denpaio/denpaio"
              target="_blank"
              title="GitHub"
              style={{ color: '#fefefe' }}>
              <FaGitHub
                style={{ fontSize: '2em' }}
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCmU7uHdtumev4giWUGHt9xA?sub_confirmation=1"
              target="_blank"
              title="YouTube"
              style={{ color: '#fefefe' }}>
              <FaYouTube
                style={{ fontSize: '2em' }}
              />
            </a>
            <a
              onClick={this.handleToggleAudioVisualizer.bind(this)}
              title="Toogle Audio Visualizer"
              style={this.currentToggleAudioVisualizer()}>
              <FaAdjust
                style={{ fontSize: '2em' }}
              />
            </a>
            <a
              onClick={this.handleToggleDanmakuMessages.bind(this)}
              title="Toogle Danmaku messages"
              style={this.currentToggleDanmakuMessages()}>
              <FaComment
                style={{ fontSize: '2em' }}
              />
            </a>
            <a
              onClick={this.handleToggleDanmakuHistory.bind(this)}
              title="Toogle Danmaku history"
              style={{ color: '#fefefe', cursor: 'pointer' }}>
              {this.currentDanmakuHistoryToggleButtonTag()}
            </a>
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

const likeButtonStyle = {
  border: 'none',
  backgroundColor: 'transparent',
  ':active': {
    color: 'red',
  }
};
