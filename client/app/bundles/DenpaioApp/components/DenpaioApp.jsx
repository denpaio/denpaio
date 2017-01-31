import React, { PropTypes } from 'react';
import SearchBar from './SearchBar';
import DanmakuBar from './DanmakuBar';

export default class DenpaioApp extends React.Component {
  static propTypes = {
    default_background_image: PropTypes.string.isRequired,
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = {
      name: 'Guest',
      defaultBackgroundImage: this.props.default_background_image,
    };
  }

  handleSearch = (keyword) => {
    this.setState({ keyword });
  };

  render() {
    backgroundStyle['backgroundImage'] = `url(${this.state.defaultBackgroundImage})`;

    return (
      <div id="denpaio-app" style={backgroundStyle}>
        <header className="player">
          <audio src="https://stream.denpa.io/denpaio.ogg" preload="none" controls />
          <SearchBar
            onSearch={this.handleSearch}
          />
        </header>
        <section className="container">
          <h3>
            Hello, {this.state.name}!
          </h3>
        </section>
        <footer className="navbar">
          <DanmakuBar />
        </footer>
      </div>
    );
  }
}

const backgroundStyle = {
  backgroundSize: 'cover',
  backgroundPosition: '50% 30%',
};
