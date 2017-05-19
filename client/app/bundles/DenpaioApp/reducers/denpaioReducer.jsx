import { combineReducers } from 'redux';
import { DENPAIO_BACKGROUND_IMAGE_UPDATE } from '../constants/denpaioConstants';

const backgroundImage = (state = '', action) => {
  switch (action.type) {
  case DENPAIO_BACKGROUND_IMAGE_UPDATE:
    return action.url;
  default:
    return state;
  }
};

const denpaioReducer = combineReducers({ backgroundImage });

export default denpaioReducer;
