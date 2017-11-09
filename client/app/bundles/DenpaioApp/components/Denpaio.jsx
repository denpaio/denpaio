import PropTypes from 'prop-types';
import React from 'react';
import Radium from 'radium';

import { HotKeys } from 'react-hotkeys';
import { Switch, Route, Link } from 'react-router-dom';

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

import NewsToast from './NewsToast';
import DanmakuBar from './DanmakuBar';
import SearchPage from './pages/SearchPage';
import TracksPage from './pages/TracksPage';

import PlaylistContainer from '../containers/PlaylistContainer';
import PlaylistPageContainer from '../containers/PlaylistPageContainer';
import HistoryPageContainer from '../containers/HistoryPageContainer';

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
    'focusDanmakuBar': this.handleFocusDanmakuBar,
  };

  constructor(props) {
    super(props);

    let name = this.constructor.name;
    let localState = JSON.parse(localStorage.getItem(`${name}.state`));

    this.state = localState || {
      isDisabledVisualizer: false,
      isDisabledDanmakuMessage: false,
      isDisabledDanmakuHistory: false,
    };
  }

  componentDidMount() {
    document.getElementById('denpaio-app').addEventListener(window.whichTransitionEvent(), function (event) {
      let target = event.target;
      target.style.transform = '';
    });
  }

  componentDidUpdate() {
    let name = this.constructor.name;
    localStorage.setItem(`${name}.state`, JSON.stringify(this.state));
  }

  currentStyle() {
    let pathname = this.props.location.pathname;
    let defaultStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    let isDisabledDanmakuHistory = this.state.isDisabledDanmakuHistory;

    if (isDisabledDanmakuHistory) {
      return <FaAngleUp style={linkButtonIconStyle} />;
    } else {
      return <FaAngleDown style={linkButtonIconStyle} />;
    }
  }

  handleLikeButton() {
    window.App.danmakuChannel.send({ action: 'create', message: '❤️' });
  }

  handleToggleDanmakuHistory() {
    let isDisabledDanmakuHistory = this.state.isDisabledDanmakuHistory;
    this.setState({ isDisabledDanmakuHistory: !isDisabledDanmakuHistory });
  }

  handleToggleAudioVisualizer() {
    if (this.state.isDisabledVisualizer) {
      this.setState({ isDisabledVisualizer: false });
      window.drawVisual = requestAnimationFrame(window.draw);
    } else {
      this.setState({ isDisabledVisualizer: true });
      cancelAnimationFrame(window.drawVisual);
      window.drawVisual = null;
      window.resizeCanvas();
    }
    this.setState({});
  }

  handleToggleDanmakuMessages() {
    if (this.state.isDisabledDanmakuMessage) {
      this.setState({ isDisabledDanmakuMessage: false });
    } else {
      this.setState({ isDisabledDanmakuMessage: true });
    }
    this.setState({});
  }

  closeButton() {
    let pathname = this.props.location.pathname;

    if (pathname === '/')
      return;

    return (
      <Link
        className="close-button"
        to="/">
        <MdClose />
      </Link>
    );
  }

  render() {
    let backgroundImage = this.props.backgroundImage;
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
          <PlaylistContainer />
        </header>
        <section
          className="container"
          style={this.currentStyle()}>
          <NewsToast />
          {this.closeButton()}
          <Switch>
            <Route path="/playlist" component={PlaylistPageContainer} />
            <Route path="/history" component={HistoryPageContainer} />
            <Route path="/search" component={SearchPage} />
            <Route path="/tracks/:id" component={TracksPage} />
          </Switch>
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
            showDanmakuHistory={!this.state.isDisabledDanmakuHistory}
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
              style={this.currentButtonStyle(this.state.isDisabledVisualizer)}>
              <FaAdjust
                style={linkButtonIconStyle}
              />
            </a>
            <a
              onClick={this.handleToggleDanmakuMessages.bind(this)}
              title="Toogle Danmaku messages"
              style={this.currentButtonStyle(this.state.isDisabledDanmakuMessage)}>
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

const backgroundStyle = {
  backgroundSize: 'cover',
  backgroundPosition: '50% 30%',
};

const likeButtonStyle = {
  border: 'none',
  backgroundColor: 'transparent',
  ':active': {
    color: 'red',
  },
};

const linkButtonStyle = {
  display: 'inline-block',
  color: 'inherit',
  cursor: 'pointer',
};

const linkButtonIconStyle = {
  fontSize: '2em',
};

export default Radium(Denpaio);
