import React from 'react';
import AudioPlayer from './AudioPlayer';
import SpinPlayer from './SpinPlayer';
import SearchBar from './SearchBar';
import Slider from 'rc-slider';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0.7,
      playlist: [],
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
        case 'destroy':
          playlist = self.state.playlist.filter((el) => el.id !== data.object.id);

          self.setState({ playlist: playlist });
          break;
        }
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
          step={0.1}
          defaultValue={0.7}
          onChange={this.handleVolumeChange.bind(this)}
        />
      </div>
    );
  }

  imageSection(track) {
    return (
      <img
        src={track.response.artwork_url60}
        style={{ maxWidth: '45px', maxHeight: '45px' }}
      />
    );
  }

  titleSection(track) {
    return (
      <div>
        <div>{track.name}</div>
        <div>{track.response.artist_name} - {track.response.collection_name}</div>
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
        <th
          style={minimumTdStyle}>
          <AudioPlayer
            volume={this.state.volume}
            ref="AudioPlayer"
          />
        </th>
        <th
          style={minimumTdStyle}>
          {image}
        </th>
        <th>
          {title}
        </th>
        <th
          style={minimumTdStyle}>
          {this.volumeSlideBar()}
        </th>
      </tr>
    );
  }

  handleVolumeChange(value) {
    this.setState({ volume: value });
  }

  handleSearch(keyword) {
    this.props.router.push('/search?q=' + encodeURIComponent(keyword));
  }

  render() {
    return (
      <div
        style={playlistContainerStyle}>
        <table
          style={playlistTableStyle}>
          <thead>
            {this.headColumn(this.state.playlist[0])}
          </thead>
          <tbody>
            {
              this.state.playlist.slice(1).map((play) =>
                <tr
                  key={play.id}>
                  <th
                    style={minimumTdStyle}>
                    <SpinPlayer
                      src={play.track.response.preview_url}
                      disabled={play.track.response.preview_url ? '' : 'disabled'}
                      title="Preview"
                    />
                  </th>
                  <td
                    style={minimumTdStyle}>
                    {this.imageSection(play.track)}
                  </td>
                  <td>
                    {this.titleSection(play.track)}
                  </td>
                  <td style={minimumTdStyle}>...</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <SearchBar
          onSearch={this.handleSearch.bind(this)}
        />
      </div>
    );
  }
}

const playlistContainerStyle = {
  maxHeight: '40vh',
  overflowY: 'auto',
};

const playlistTableStyle = {
  width: '100%',
};

const minimumTdStyle = {
  width: '1em',
  whiteSpace: 'nowrap',
};
