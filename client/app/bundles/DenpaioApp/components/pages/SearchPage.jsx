import PropTypes from 'prop-types';
import React from 'react';
import ReactPaginate from 'react-paginate';

import SpinPlayer from '../SpinPlayer';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: null,
      page: null,
      data: {
        result_count: 0,
        result_limit: 0,
        results: [],
      },
      isPlayingPreviewAudio: [],
    };
  }

  fetchSearchResults(keyword, page = 1) {
    let self = this;
    fetch('/api/v1/tracks/search.json?q=' + encodeURIComponent(keyword) + `&page=${page}`)
    .then((response) => {
      if (response.status !== 200) {
        alert(response.statusText);
        return;
      }
      response.json().then(function(data) {
        self.setState({
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
    let search = this.props.location.search;
    let params = new URLSearchParams(search);
    let keyword = params.get('q');
    let page = params.get('page');

    this.setState({ keyword, page });
    this.fetchSearchResults(keyword, page);
  }

  componentWillReceiveProps(nextProps) {
    let search = nextProps.location.search;
    let params = new URLSearchParams(search);
    let keyword = params.get('q');
    let page = params.get('page');

    this.setState({ keyword, page });
    this.fetchSearchResults(keyword, page);
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
    this.context.router.history.push(`/tracks/${trackId}`);
  }

  handlePageHref(page) {
    let keyword = this.state.keyword;
    return '/search?q=' + encodeURIComponent(keyword) + `&page=${page}`;
  }

  handlePageClick(event) {
    let keyword = this.state.keyword;
    let page = event.selected + 1;
    this.context.router.history.push('/search?q=' + encodeURIComponent(keyword) + `&page=${page}`);
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

  paginator() {
    let currentPage = parseInt(this.state.page) - 1 || 0;
    let pageCount = Math.ceil(this.state.data.result_count / this.state.data.result_limit);

    return (
      <ReactPaginate
        initialPage={currentPage}
        pageCount={pageCount}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        containerClassName={'pagination'}
        activeClassName={'active'}
        hrefBuilder={this.handlePageHref.bind(this)}
        onPageChange={this.handlePageClick.bind(this)}
        disableInitialCallback={true}
      />
    );
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
        {this.paginator()}
      </div>
    );
  }
}

SearchPage.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const searchTableStyle = {
  width: '100%',
};

const minimumTdStyle = {
  width: '1em',
  whiteSpace: 'nowrap',
};
