import { connect } from 'react-redux';
import Playlist from '../components/Playlist';
import * as actions from '../actions/denpaioActionCreators';

const mapStateToProps = (state) => ({
  playlist: state.playlist
});

export default connect(mapStateToProps, actions)(Playlist);
