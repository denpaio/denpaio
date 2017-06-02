import { combineReducers } from 'redux';
import {
  DENPAIO_BACKGROUND_IMAGE_UPDATE,
  DENPAIO_PLAY_RELOAD,
  DENPAIO_PLAY_CREATE,
  DENPAIO_PLAY_UPDATE,
  DENPAIO_PLAY_DESTROY
} from '../constants/denpaioConstants';

const backgroundImage = (state = '', action) => {
  switch (action.type) {
  case DENPAIO_BACKGROUND_IMAGE_UPDATE:
    return action.url;
  default:
    return state;
  }
};

const playlist = (state = [], action) => {
  var newState = [...state];
  var newPlay, index;

  switch (action.type) {
  case DENPAIO_PLAY_RELOAD:
    return action.plays.reverse();
  case DENPAIO_PLAY_CREATE:
    newPlay = action.play;

    if (newPlay.played_at) {
      newState.shift();
      newState.unshift(newPlay);
    } else {
      newState.push(newPlay);
    }

    return newState;
  case DENPAIO_PLAY_UPDATE:
    newPlay = action.play;
    index = newState.findIndex((el) => el.id === newPlay.id);

    if (newPlay.played_at && index !== -1) {
      newState.splice(0, index + 1, newPlay);
    } else {
      newState.splice(index, 1, newPlay);
    }

    return newState;
  case DENPAIO_PLAY_DESTROY:
    return state.filter((el) => el.id !== newPlay.id);
  default:
    return state;
  }
};

const denpaioReducer = combineReducers({ backgroundImage, playlist });

export default denpaioReducer;
