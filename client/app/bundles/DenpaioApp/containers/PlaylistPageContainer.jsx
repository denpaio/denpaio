import { connect } from 'react-redux';
import PlaylistPage from '../components/pages/PlaylistPage';
import * as actions from '../actions/denpaioActionCreators';

const mapStateToProps = (state) => ({
  playlist: state.playlist
});

export default connect(mapStateToProps, actions)(PlaylistPage);
