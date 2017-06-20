import { connect } from 'react-redux';
import HistoryPage from '../components/pages/HistoryPage';
import * as actions from '../actions/denpaioActionCreators';

const mapStateToProps = () => ({});

export default connect(mapStateToProps, actions)(HistoryPage);
