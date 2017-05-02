import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppLayout from './AppLayout';
import IndexPage from './pages/IndexPage';
import SearchPage from './pages/SearchPage';
import TracksPage from './pages/TracksPage';
import 'whatwg-fetch';

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
      backgroundImage: this.props.default_background_image,
    };
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppLayout} backgroundImage={this.state.backgroundImage}>
          <IndexRoute component={IndexPage} />
          <Route path="search" component={SearchPage} />
          <Route path="tracks/:id" component={TracksPage} />
        </Route>
      </Router>
    );
  }
}
