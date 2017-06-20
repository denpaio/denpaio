import React from 'react';
import { NavLink } from 'react-router-dom';

const PlaylistNavBar = () => (
  <div
    style={{ textAlign: 'center' }}>
    <NavLink
      to="/playlist"
      style={tabLinkStyle}
      activeStyle={tabLinkactiveStyle}>
      Playlist
    </NavLink>
    <NavLink
      to="/history"
      style={tabLinkStyle}
      activeStyle={tabLinkactiveStyle}>
      History
    </NavLink>
  </div>
);

export default PlaylistNavBar;

const tabLinkStyle = {
  display: 'inline-block',
  marginTop: '0.5em',
  padding: '0.25em 0.5em',
  border: '1px solid #19a5ff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const tabLinkactiveStyle = {
  pointerEvents: 'none',
  color: '#999',
};
