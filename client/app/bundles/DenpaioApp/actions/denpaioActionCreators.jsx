/* eslint-disable import/prefer-default-export */

import { DENPAIO_BACKGROUND_IMAGE_UPDATE } from '../constants/denpaioConstants';

export const updateBackgroundImage = (url) => ({
  type: DENPAIO_BACKGROUND_IMAGE_UPDATE,
  url,
});
