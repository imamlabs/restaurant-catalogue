import CONFIG from './CONFIG';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  ADD_REVIEW: `${CONFIG.BASE_URL}review`,
  IMAGE: {
    SMALL: (pictureId) => `${CONFIG.BASE_IMAGE_URL.SMALL}${pictureId}`,
    MEDIUM: (pictureId) => `${CONFIG.BASE_IMAGE_URL.MEDIUM}${pictureId}`,
    LARGE: (pictureId) => `${CONFIG.BASE_IMAGE_URL.LARGE}${pictureId}`,
  },
};

export default API_ENDPOINT;
