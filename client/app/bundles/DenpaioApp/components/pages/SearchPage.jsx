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
        <tbody>
          {
            this.state.results.map((result) =>
              <tr key={result.track_id}>
                <td>
                  <SpinPlayer
                    src={result.preview_url}
                  />
                </td>
                <td><img src={result.artwork_url60} style={{maxWidth: '30px', maxHeight: '30px'}} /></td>
                <td>{result.track_name}</td>
                <td>{result.artist_name}</td>
                <td>{result.collection_name}</td>
                <td>{result.track_time_millis}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}
