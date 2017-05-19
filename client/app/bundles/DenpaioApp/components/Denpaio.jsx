import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppLayout from './AppLayout';
import IndexPage from './pages/IndexPage';
import SearchPage from './pages/SearchPage';
import TracksPage from './pages/TracksPage';
import 'whatwg-fetch';

const Denpaio = ({ backgroundImage }) => (
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout} backgroundImage={backgroundImage}>
      <IndexRoute component={IndexPage} />
      <Route path="search" component={SearchPage} />
      <Route path="tracks/:id" component={TracksPage} />
    </Route>
  </Router>
);

Denpaio.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
};

export default Denpaio;
