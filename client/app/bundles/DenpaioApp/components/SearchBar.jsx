import React from 'react';
import Radium from 'radium';

@Radium
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
  boxShadow: '0px 2px 0px #cc4b37',
  ':focus': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
};
