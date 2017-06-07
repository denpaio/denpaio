import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';

import AudioPlayer from './AudioPlayer';
import SearchBar from './SearchBar';

import {
  reloadPlaylist,
  addToPlaylist,
  updatePlaylist,
  destroyOfPlaylist,
} from '../actions/denpaioActionCreators';

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
    const self = this;
    const { store } = this.context;

    window.App.playlistChannel = window.App.cable.subscriptions.create('PlaylistChannel', {
      connected: function() {
        window.App.playlistChannel.send({ action: 'reload' });
      },
      received: function(data) {
        switch(data.action) {
        case 'reload':
          store.dispatch(reloadPlaylist(data.objects));
          break;
        case 'create':
          store.dispatch(addToPlaylist(data.object));
          break;
        case 'update':
          store.dispatch(updatePlaylist(data.object));
          break;
        case 'destroy':
          store.dispatch(destroyOfPlaylist(data.object));
          break;
        }
      },
    });

    window.App.StatusChannel = window.App.cable.subscriptions.create('StatusChannel', {
      connected: function() {
        window.App.StatusChannel.send({ action: 'reload' });
      },
      received: function(data) {
        let listenerCount = data.object.listener_count || 0;
        self.setState({ listenerCount });
      },
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
        href={track.response.artwork_url100.replace('100x100bb', '1280x1280bb')}
        target="_blank"
        style={{ display: 'inline-block' }}>
        <img
          src={track.response.artwork_url100}
          style={{ maxWidth: '45px', maxHeight: '45px', verticalAlign: 'middle' }}
        />
      </a>
    );
  }

  titleSection(track) {
    return (
      <Link
        to="/playlist"
        style={{ display: 'block', color: 'inherit' }}>
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
      </Link>
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
            {this.headColumn(this.props.playlist[0])}
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
