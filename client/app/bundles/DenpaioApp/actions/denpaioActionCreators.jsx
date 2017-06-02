/* eslint-disable import/prefer-default-export */

import {
  DENPAIO_BACKGROUND_IMAGE_UPDATE,
  DENPAIO_PLAY_RELOAD,
  DENPAIO_PLAY_CREATE,
  DENPAIO_PLAY_UPDATE,
  DENPAIO_PLAY_DESTROY
} from '../constants/denpaioConstants';

export const updateBackgroundImage = (url) => ({
  type: DENPAIO_BACKGROUND_IMAGE_UPDATE,
  url,
});

export const reloadPlaylist = (plays) => ({
  type: DENPAIO_PLAY_RELOAD,
  plays,
});

export const addToPlaylist = (play) => ({
  type: DENPAIO_PLAY_CREATE,
  play,
});

export const updatePlaylist = (play) => ({
  type: DENPAIO_PLAY_UPDATE,
  play,
});

export const destroyOfPlaylist = (play) => ({
  type: DENPAIO_PLAY_DESTROY,
  play,
});
