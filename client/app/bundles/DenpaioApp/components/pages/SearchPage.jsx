import React from 'react';
import SpinPlayer from '../SpinPlayer';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: null,
      data: {
        result_count: 0,
        results: [],
      },
      isPlayingPreviewAudio: [],
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
        self.setState({
          keyword: keyword,
          data: data,
        });
      });
    });
  }

  fetchRequestResult(trackId) {
    fetch('/api/v1/plays.json', {
      method: 'POST',
      body: 'track_id=' + encodeURIComponent(trackId),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        alert(response.statusText);
        return;
      }
      response.json().then(function(data) {
        alert(`Success! Song '${data.track.name}' requested.`);
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

  handleRequest(event) {
    event.preventDefault();
    let self = event.target;
    let trackId = self.dataset.trackId;
    this.fetchRequestResult(trackId);
  }

  handleClickName(event) {
    event.preventDefault();
    let self = event.target;
    let trackId = self.dataset.trackId;
    this.props.router.push(`/tracks/${trackId}`);
  }

  requestColumn(result) {
    if (result.id) {
      return (
        <a
          data-track-id={result.id}
          onClick={this.handleRequest.bind(this)}>
          Request
        </a>
      );
    } else {
      return (
        <a
          onClick={ () => alert('Not completed yet QAQ') }>
          Suggest
        </a>
      );
    }
  }

  nameColumn(result) {
    if (result.id) {
      return (
        <a
          href={`/tracks/${result.id}`}
          data-track-id={result.id}
          onClick={this.handleClickName.bind(this)}>
          {result.response.track_name}
        </a>
      );
    } else {
      return result.response.track_name;
    }
  }

  render() {
    return (
      <div>
        <p>About {this.state.data.result_count} results</p>
        <table
          style={searchTableStyle}>
          <thead>
            <tr>
              <th style={minimumTdStyle}></th>
              <th style={minimumTdStyle}></th>
              <th style={minimumTdStyle}></th>
              <th>Name</th>
              <th>Artist</th>
              <th>Album</th>
              <th style={minimumTdStyle}>Genre</th>
              <th style={minimumTdStyle}>Time</th>
              <th style={minimumTdStyle}></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.results.map((result) =>
                <tr key={result.response.track_id}>
                  <td
                    style={minimumTdStyle}>
                    {this.requestColumn(result)}
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
                      style={{ maxWidth: '30px', maxHeight: '30px' }}
                    />
                  </td>
                  <td>{this.nameColumn(result)}</td>
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
      </div>
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

const searchTableStyle = {
  width: '100%',
};

const minimumTdStyle = {
  width: '1em',
  whiteSpace: 'nowrap',
};
