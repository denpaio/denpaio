import React from 'react';
import moment from 'moment';

import PlaylistNavBar from '../partials/PlaylistNavBar';
import SpinPlayer from '../SpinPlayer';

export default class HistoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        result_count: 0,
        results: [],
      },
    };
  }

  componentDidMount() {
    const self = this;

    fetch('/api/v1/plays?include=track&played=true')
    .then((response) => {
      if (response.status !== 200) {
        alert(response.statusText);
        return;
      }

      response.json().then(function(data) {
        self.setState({ data });
      });
    });
  }

  render() {
    return (
      <div>
        <PlaylistNavBar />
        <p>About {this.state.data.result_count} requests</p>
        <table
          style={playlistTableStyle}>
          <tbody>
            {
              this.state.data.results.filter((el) => el.played_at).reverse().map((play) => (
                <tr key={play.id}>
                  <td
                    style={minimumTdStyle}>
                    <time
                      dateTime={play.played_at}
                      title={moment(play.played_at).format('lll')}
                    >
                      {moment(play.played_at).fromNow()}
                    </time>
                  </td>
                  <td
                    style={minimumTdStyle}>
                    <SpinPlayer
                      src={play.track.response.preview_url}
                      disabled={play.track.response.preview_url ? '' : 'disabled'}
                      title="Preview"
                    />
                  </td>
                  <td
                    style={minimumTdStyle}>
                    <img
                      src={play.track.response.artwork_url100}
                      style={{ maxWidth: '30px', maxHeight: '30px' }}
                    />
                  </td>
                  <td>{play.track.response.track_name}</td>
                  <td>{play.track.response.artist_name}</td>
                  <td>{play.track.response.collection_name}</td>
                  <td
                    style={minimumTdStyle}>
                    {play.track.response.primary_genre_name}
                  </td>
                  <td
                    style={minimumTdStyle}>
                    {play.track.response.track_time_millis.toHumanDuration()}
                  </td>
                  <td
                    style={minimumTdStyle}>
                    <a href={play.track.response.track_view_url} target="_blank">Buy</a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const playlistTableStyle = {
  width: '100%',
};

const minimumTdStyle = {
  width: '1em',
  whiteSpace: 'nowrap',
};
