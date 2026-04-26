'use strict';

import axios from 'axios';

export const limit = 15;

export default async function getImagesByQuery(query, page = 1) {
  const parameters = {
    params: {
      key: '55507124-55cf7e8db58c14a0702f34115',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: limit,
    },
  };

  const response = await axios.get('https://pixabay.com/api', parameters);
  return response.data;
}
