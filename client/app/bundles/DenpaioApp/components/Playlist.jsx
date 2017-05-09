import React from 'react';
import AudioPlayer from './AudioPlayer';
import SpinPlayer from './SpinPlayer';
import SearchBar from './SearchBar';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: []
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

  headColumn(playing) {
    if (playing) {
      return (
        <tr>
          <th style={minimumTdStyle}><AudioPlayer /></th>
          <th style={minimumTdStyle}>
            <img
              src={playing.track.response.artwork_url60}
              style={{maxWidth: '45px', maxHeight: '45px'}}
            />
          </th>
          <th>
            <div>{playing.track.name}</div>
            <div>{playing.track.response.artist_name}</div>
          </th>
          <th style={minimumTdStyle}>Volume Control</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th style={minimumTdStyle}><AudioPlayer /></th>
          <th style={minimumTdStyle}>-</th>
          <th>Loading . . .</th>
          <th style={minimumTdStyle}>Volume Control</th>
        </tr>
      );
    }
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
                    <img
                      src={play.track.response.artwork_url60}
                      style={{maxWidth: '45px', maxHeight: '45px'}}
                    />
                  </td>
                  <td>
                    <div>{play.track.name}</div>
                    <div>{play.track.response.artist_name}</div>
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
  overflowY: 'scroll',
};

const playlistTableStyle = {
  width: '100%',
};

const minimumTdStyle = {
  width: '1em',
  whiteSpace: 'nowrap',
};
