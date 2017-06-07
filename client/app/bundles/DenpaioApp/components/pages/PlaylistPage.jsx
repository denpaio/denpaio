import React from 'react';

import SpinPlayer from '../SpinPlayer';

const PlaylistPage = ({ playlist }) => (
  <div>
    <p>About {playlist.length} requests</p>
    <table
      style={playlistTableStyle}>
      <tbody>
        {
          playlist.map((play, index) => (
            <tr key={play.id}>
              <td
                style={minimumTdStyle}>
                {index + 1}
              </td>
              <td
                style={minimumTdStyle}>
                <SpinPlayer
                  src={play.track.response.preview_url}
                  disabled={play.track.response.preview_url ? '' : 'disabled'}
                  title="Preview"
                />
              </td>
              <td
                style={minimumTdStyle}>
                <img
                  src={play.track.response.artwork_url100}
                  style={{ maxWidth: '30px', maxHeight: '30px' }}
                />
              </td>
              <td>{play.track.response.track_name}</td>
              <td>{play.track.response.artist_name}</td>
              <td>{play.track.response.collection_name}</td>
              <td
                style={minimumTdStyle}>
                {play.track.response.primary_genre_name}
              </td>
              <td
                style={minimumTdStyle}>
                {play.track.response.track_time_millis.toHumanDuration()}
              </td>
              <td
                style={minimumTdStyle}>
                <a href={play.track.response.track_view_url} target="_blank">Buy</a>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default PlaylistPage;

const playlistTableStyle = {
  width: '100%',
};

const minimumTdStyle = {
  width: '1em',
  whiteSpace: 'nowrap',
};
