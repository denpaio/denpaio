import PropTypes from 'prop-types';
import React from 'react';

import AudioPlayer from './AudioPlayer';
import SearchBar from './SearchBar';
import Slider from 'rc-slider';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0.7,
      playlist: [],
      listenerCount: 0,
    };
  }

  componentDidMount() {
    let self = this;

    window.App.playlistChannel = window.App.cable.subscriptions.create('PlaylistChannel', {
      connected: function() {
        window.App.playlistChannel.send({action: 'reload'});
      },
      received: function(data) {
        let playlist = [];
        let index = null;

        switch(data.action) {
        case 'reload':
          self.setState({ playlist: data.objects.reverse() });
          break;
        case 'create':
          playlist = self.state.playlist;

          if (data.object.played_at) {
            playlist.shift();
            playlist.unshift(data.object);
          } else {
            playlist.push(data.object);
          }

          self.setState({ playlist: playlist });
          break;
        case 'update':
          playlist = self.state.playlist;
          index = playlist.findIndex((el) => el.id === data.object.id);

          if (data.object.played_at && index !== -1) {
            playlist.splice(0, index + 1, data.object);
          } else {
            playlist.splice(index, 1, data.object);
          }

          self.setState({ playlist: playlist });
          break;
        case 'destroy':
          playlist = self.state.playlist.filter((el) => el.id !== data.object.id);

          self.setState({ playlist: playlist });
          break;
        }
      }
    });

    window.App.StatusChannel = window.App.cable.subscriptions.create('StatusChannel', {
      connected: function() {
        window.App.StatusChannel.send({action: 'reload'});
      },
      received: function(data) {
        let listenerCount = data.object.listener_count || 0;
        self.setState({ listenerCount });
      }
    });
  }

  volumeSlideBar() {
    const sliderContainerStyle = {
      width: '5em',
    };

    return (
      <div style={sliderContainerStyle}>
        <Slider
          min={0}
          max={1}
          step={0.05}
          defaultValue={0.7}
          onChange={this.handleVolumeChange.bind(this)}
        />
      </div>
    );
  }

  imageSection(track) {
    return (
      <a
        href={track.response.artwork_url60.replace('60x60bb', '1280x1280bb')}
        target="_blank"
        style={{ display: 'inline-block' }}>
        <img
          src={track.response.artwork_url60}
          style={{ maxWidth: '45px', maxHeight: '45px', verticalAlign: 'middle' }}
        />
      </a>
    );
  }

  titleSection(track) {
    return (
      <div>
        <div>{track.name}</div>
        <div
          style={{ fontSize: 'smaller' }}>
          <span
            style={{ float: 'left' }}>
            0:00
          </span>
          <span>
            {track.response.artist_name} - {track.response.collection_name}
          </span>
          <span
            style={{ float: 'right' }}>
            {track.response.track_time_millis.toHumanDuration()}
          </span>
        </div>
      </div>
    );
  }

  headColumn(playing) {
    let image = '-';
    let title = 'Loading . . .';

    if (playing) {
      image = this.imageSection(playing.track);
      title = this.titleSection(playing.track);
    }

    return (
      <tr>
        <th>
          <AudioPlayer
            volume={this.state.volume}
            ref="AudioPlayer"
          />
        </th>
        <th>
          {this.volumeSlideBar()}
        </th>
        <th
          className="image">
          {image}
        </th>
        <th
          className="title">
          {title}
        </th>
        <th
          className="listeners">
          <span>{this.state.listenerCount} listeners</span>
        </th>
        <th>
          <SearchBar
            onSearch={this.handleSearch.bind(this)}
            style={{ whiteSpace: 'nowrap' }}
          />
        </th>
      </tr>
    );
  }

  handleVolumeChange(value) {
    this.setState({ volume: value });
  }

  handleSearch(keyword) {
    this.context.router.history.push('/search?q=' + encodeURIComponent(keyword));
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            {this.headColumn(this.state.playlist[0])}
          </thead>
        </table>
      </div>
    );
  }
}

Playlist.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
