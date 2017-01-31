import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var searchbar = e.target.searchbar;
    var keyword = searchbar.value;
    this.props.onSearch(keyword);
    searchbar.blur();
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={searchFormStyle}
        >
        <input
          name="searchbar"
          className="searchbar"
          type="search"
          placeholder="Search"
          style={searchBarStyle}
        />
      </form>
    );
  }
}

const searchFormStyle = {
  float: 'right',
};
const searchBarStyle = {
  display: 'inline-block',
  backgroundColor: 'transparent',
  margin: 0,
  border: 'none',
  maxWidth: '300px',
  height: '2em',
};
