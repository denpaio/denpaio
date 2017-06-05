import React from 'react';
import Radium from 'radium';
import MdSearch from 'react-icons/lib/md/search';

class SearchBar extends React.Component {
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
        style={this.props.style}>
        <label
          htmlFor="searchbar">
          <MdSearch
            style={{ fontSize: '2em', cursor: 'pointer' }}
          />
        </label>
        <input
          id="searchbar"
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

const searchBarStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  maxWidth: '0',
  height: '2em',
  opacity: '0',
  transition: 'all 0.3s linear',
  boxShadow: '0px 2px 0px #cc4b37',
  ':focus': {
    maxWidth: '12em',
    opacity: '1',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
};

export default Radium(SearchBar);
