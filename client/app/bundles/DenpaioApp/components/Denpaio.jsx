import PropTypes from 'prop-types';
import React from 'react';
import Radium from 'radium';
import { HotKeys } from 'react-hotkeys';
import { Route } from 'react-router-dom';

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
import SearchPage from './pages/SearchPage';
import TracksPage from './pages/TracksPage';

class Denpaio extends React.Component {
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
    setTimeout(function () {
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
    document.getElementById('denpaio-app').addEventListener(window.whichTransitionEvent(), function (event) {
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

  currentButtonStyle(state) {
    if (state) {
      return Object.assign({}, linkButtonStyle, { color: '#666' });
    }

    return linkButtonStyle;
  }

  currentDanmakuHistoryToggleButtonTag() {
    let isShowDanmakuHistory = this.state.isShowDanmakuHistory;

    if (isShowDanmakuHistory) {
      return <FaAngleDown style={linkButtonIconStyle} />;
    } {
      return <FaAngleUp style={linkButtonIconStyle} />;
    }
  }

  handleCloseButton() {
    this.context.router.history.push('/');
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
    const { store } = this.context;
    let backgroundImage = store.getState().backgroundImage;

    backgroundStyle['backgroundImage'] = `url(${backgroundImage})`;

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
          <Playlist />
        </header>
        <section
          className="container"
          style={this.currentStyle()}>
          {this.closeButton()}
          <Route path="/search" component={SearchPage} />
          <Route path="/tracks/:id" component={TracksPage} />
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
              style={linkButtonStyle}>
              <MdPlaylistPlay
                style={linkButtonIconStyle}
              />
            </a>
            <a
              href="https://twitter.com/denpaio"
              target="_blank"
              title="Twitter"
              style={linkButtonStyle}>
              <FaTwitter
                style={linkButtonIconStyle}
              />
            </a>
            <a
              href="https://www.facebook.com/denpaio/"
              target="_blank"
              title="Facebook"
              style={linkButtonStyle}>
              <FaFacebook
                style={linkButtonIconStyle}
              />
            </a>
            <a
              href="https://github.com/denpaio/denpaio"
              target="_blank"
              title="GitHub"
              style={linkButtonStyle}>
              <FaGitHub
                style={linkButtonIconStyle}
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCmU7uHdtumev4giWUGHt9xA?sub_confirmation=1"
              target="_blank"
              title="YouTube"
              style={linkButtonStyle}>
              <FaYouTube
                style={linkButtonIconStyle}
              />
            </a>
            <a
              onClick={this.handleToggleAudioVisualizer.bind(this)}
              title="Toogle Audio Visualizer"
              style={this.currentButtonStyle(window.isDisabledVisualizer)}>
              <FaAdjust
                style={linkButtonIconStyle}
              />
            </a>
            <a
              onClick={this.handleToggleDanmakuMessages.bind(this)}
              title="Toogle Danmaku messages"
              style={this.currentButtonStyle(window.isDisabledDanmakuMessage)}>
              <FaComment
                style={linkButtonIconStyle}
              />
            </a>
            <a
              onClick={this.handleToggleDanmakuHistory.bind(this)}
              title="Toogle Danmaku history"
              style={linkButtonStyle}>
              {this.currentDanmakuHistoryToggleButtonTag()}
            </a>
          </div>
        </footer>
      </HotKeys>
    );
  }
}

Denpaio.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

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

const linkButtonStyle = {
  display: 'inline-block',
  color: '#fefefe',
  cursor: 'pointer',
};

const linkButtonIconStyle = {
  fontSize: '2em',
};

export default Radium(Denpaio);
