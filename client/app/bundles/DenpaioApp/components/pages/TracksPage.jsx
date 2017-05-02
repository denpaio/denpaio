import React from 'react';

export default class TracksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      isAdmin: window.isAdmin,
      data: {}
    };
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
          data: data
        });
      });
    });
  }

  componentDidMount() {
    let id = this.props.params.id;
    this.fetchTrackDetail(id);
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.params.id;
    this.fetchTrackDetail(id);
  }

  adminFunctionStyle() {
    let defaultStyle = {
      display: 'none'
    };

    if (this.state.isAdmin) {
      return {};
    }

    return defaultStyle;
  }

  render() {
    return (
      <form action={`/api/v1/tracks/${this.state.data.id}`} method="POST" encType="multipart/form-data">
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
              <td>File</td><td><input name="track[file]" type="file" /></td>
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
