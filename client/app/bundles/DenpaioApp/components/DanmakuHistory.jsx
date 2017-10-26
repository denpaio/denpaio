import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class DanmakuHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      danmakuHistory: [],
    };
  }

  componentDidMount() {
    let self = this;

    window.App.danmakuChannel = window.App.cable.subscriptions.create('DanmakuChannel', {
      connected: function() {
        window.App.danmakuChannel.send({ action: 'reload' });
      },
      received: function(data) {
        var danmakuHistory;
        var danmakuHistoryContainer = document.querySelector('#danmaku-history-container');

        switch (data.action) {
        case 'reload':
          danmakuHistory = data.objects;
          self.setState({ danmakuHistory: danmakuHistory });
          break;
        case 'create':
          danmakuHistory = self.state.danmakuHistory;
          danmakuHistory.push(data);
          self.setState({ danmakuHistory: danmakuHistory });
          window.createDanmaku(data);

          danmakuHistoryContainer.scrollTop = danmakuHistoryContainer.scrollHeight;
          break;
        }
      },
    });
  }

  list() {
    let messageStack = this.state.danmakuHistory.slice(0);
    let lastPlay = 0;
    let offset = 0;

    this.state.danmakuHistory.forEach(function(message, index) {
      if (message.playing.track.id !== lastPlay) {
        messageStack.splice(index + offset++, 0, message.playing);
        lastPlay = message.playing.track.id;
      }
    });

    return (
      messageStack.map(function(item) {
        if (item.track) {
          let playedAt = moment(item.played_at).format('HH:mm');

          return (
            <li
              key={item.track.id}>
              <span>{playedAt} {item.track.name}</span>
            </li>
          );
        } else {
          return (
            <li
              key={item.id}>
              <span>{item.message}</span>
            </li>
          );
        }
      })
    );
  }

  render() {
    return (
      <div
        id="danmaku-history-wrapper"
        style={currentDanmakuHistoryWrapperStyle({ showDanmakuHistory: true })}>
        <ul
          id="danmaku-history-container"
          style={danmakuHistoryContainerStyle}>
          {this.list()}
        </ul>
      </div>
    );
  }
}

const danmakuHistoryContainerStyle = {
  width: 'calc(100% + 17px)',
  maxHeight: '40vh',
  overflow: 'hidden',
  overflowY: 'auto',
  margin: '0 0.5em',
  padding: '0',
  listStyleType: 'none',
};

function currentDanmakuHistoryWrapperStyle({ showDanmakuHistory }) {
  const defaultStyle = {
    position: 'absolute',
    bottom: '2.5em',
    left: '0',
    right: '0',
    overflow: 'hidden',
  };

  if (!showDanmakuHistory) {
    return Object.assign({}, defaultStyle, { display: 'none' });
  }

  return defaultStyle;
}
