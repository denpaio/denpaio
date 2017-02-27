import React from 'react';
import SearchBar from './SearchBar';
import DanmakuBar from './DanmakuBar';

export default class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  currentStyle() {
    let pathname = this.props.location.pathname;
    let defaultStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    };
    return pathname === '/' ? {} : defaultStyle;
  }

  handleSearch = (keyword) => {
    this.setState({ keyword });
    this.props.router.push(`/search?q=${keyword}`);
  };

  render() {
    backgroundStyle['backgroundImage'] = `url(${this.props.route.backgroundImage})`;

    return (
      <div id="denpaio-app" style={backgroundStyle}>
        <header className="player">
          <audio src="https://stream.denpa.io/denpaio.ogg" preload="none" controls />
          <SearchBar
            onSearch={this.handleSearch}
          />
        </header>
        <section className="container" style={this.currentStyle()}>
          {this.props.children}
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
