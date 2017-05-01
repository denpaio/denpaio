import React from 'react';
import SpinPlayer from './SpinPlayer';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      results: [],
      isPlayingPreviewAudio: []
    };
  }

  fetchSearchResults(keyword) {
    let self = this;
    fetch('/api/v1/tracks/search.json?q=' + encodeURIComponent(keyword))
    .then((response) => {
      if (response.status !== 200) {
        alert(response.statusText);
        return;
      }
      response.json().then(function(data) {
        if (!data) {
          alert(data);
          return;
        }
        self.setState({
          keyword: keyword,
          results: data.results
        });
      });
    });
  }

  componentDidMount() {
    let keyword = this.props.location.query.q;
    this.fetchSearchResults(keyword);
  }

  componentWillReceiveProps(nextProps) {
    let keyword = nextProps.location.query.q;
    this.fetchSearchResults(keyword);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.keyword !== this.props.location.query.q;
  }

  render() {
    return (
      <table>
        <thead>
          <th style={minimumTdStyle}></th>
          <th style={minimumTdStyle}></th>
          <th style={minimumTdStyle}></th>
          <th>Name</th>
          <th>Artist</th>
          <th>Album</th>
          <th style={minimumTdStyle}>Genre</th>
          <th style={minimumTdStyle}>Time</th>
          <th style={minimumTdStyle}></th>
        </thead>
        <tbody>
          {
            this.state.results.map((result) =>
              <tr key={result.response.track_id}>
                <td
                  style={minimumTdStyle}>
                  <a href="javascript:alert('Not in the opening time yet . . .')">Request</a>
                </td>
                <td
                  style={minimumTdStyle}>
                  <SpinPlayer
                    src={result.response.preview_url}
                    disabled={result.response.preview_url ? '' : 'disabled'}
                    title="Preview"
                  />
                </td>
                <td
                  style={minimumTdStyle}>
                  <img
                    src={result.response.artwork_url60}
                    style={{maxWidth: '30px', maxHeight: '30px'}}
                  />
                </td>
                <td>{result.response.track_name}</td>
                <td>{result.response.artist_name}</td>
                <td>{result.response.collection_name}</td>
                <td
                  style={minimumTdStyle}>
                  {result.response.primary_genre_name}
                </td>
                <td
                  style={minimumTdStyle}>
                  {result.response.track_time_millis.toHumanDuration()}
                  </td>
                <td
                  style={minimumTdStyle}>
                  <a href={result.response.track_view_url} target="_blank">Buy</a>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}

Object.assign(Number.prototype, {
  toHumanDuration() {
    let minutes = parseInt(this / 60000);
    let seconds = parseInt(this % 60000 / 1000);
    let padSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${padSeconds}`;
  }
});

const minimumTdStyle = {
  width: '1em',
  whiteSpace: 'nowrap',
};
