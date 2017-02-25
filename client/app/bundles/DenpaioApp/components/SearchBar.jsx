import React from 'react';

export default class SearchBar extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let searchbar = e.target.searchbar;
    let keyword = searchbar.value;
    searchbar.value = '';
    searchbar.blur();
    this.props.onSearch(keyword);
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
