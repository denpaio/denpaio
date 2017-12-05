import PropTypes from 'prop-types';
import React from 'react';

export default class TracksPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      isAdmin: false,
      data: {},
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  fetchTrackDetail(id) {
    let self = this;
    fetch(`/api/v1/tracks/${id}.json`)
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
          id: id,
          data: data,
        });
      });
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    let self = this;
    let data = new FormData();
    let myHeaders = new Headers();

    data.append('_method', 'PUT');
    data.append('track[file]', this.refs.file.files[0]);
    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

    let url = `/api/v1/tracks/${this.state.data.id}.json`;
    let myInit = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: data,
    };
    let myRequest = new Request(url, myInit);

    fetch(myRequest).then(function(response) {
      if (response.status !== 200) {
        alert(response.statusText);
        return;
      }
      return response.json();
    }).then(function(data) {
      if (!data)
        return;
      let id = self.props.match.params.id;
      self.fetchTrackDetail(id);
    });
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let isAdmin = this.props.isAdmin;
    this.fetchTrackDetail(id);
    this.setState({ isAdmin });
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.match.params.id;
    this.fetchTrackDetail(id);
  }

  adminFunctionStyle() {
    let defaultStyle = {
      display: 'none',
    };

    if (this.state.isAdmin) {
      return {};
    }

    return defaultStyle;
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} method="POST" encType="multipart/form-data">
        <input name="utf8" type="hidden" value="✓" />
        <input name="_method" type="hidden" value="PUT" />
        <table>
          <tbody>
            <tr>
              <td>Name</td><td>{this.state.data.name}</td>
            </tr>
            <tr>
              <td>Artist</td><td>{this.state.data.artist}</td>
            </tr>
            <tr>
              <td>Identity</td><td>{this.state.data.identity}</td>
            </tr>
            <tr>
              <td>Response</td><td><pre>{JSON.stringify(this.state.data.response, null, 2)}</pre></td>
            </tr>
            <tr>
              <td>SHA1</td><td>{this.state.data.sha1}</td>
            </tr>
            <tr style={this.adminFunctionStyle()}>
              <td>File</td><td><input ref="file" name="track[file]" type="file" /></td>
            </tr>
            <tr style={this.adminFunctionStyle()}>
              <td></td><td><input type="submit" /></td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

TracksPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

TracksPage.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
