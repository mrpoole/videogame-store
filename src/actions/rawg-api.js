import axios from 'axios';
import config from '../config';

const RAWG_CONFIG = {
  baseUrl: 'https://rawg-video-games-database.p.rapidapi.com/',
  headers: {
    'x-rapidapi-key': config.RAWG_API_KEY,
    'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
  },
};

export default async function getGameList(
  queryCategory = null,
  queryItem = null
) {
  // sample url with query string: https://rawg-video-games-database.p.rapidapi.com/games?genres=action
  const query = queryCategory ? `?${queryCategory}=${queryItem}` : '';
  const options = {
    method: 'GET',
    url: `${RAWG_CONFIG.baseUrl}games${query}`,
    headers: RAWG_CONFIG.headers,
  };

  let list;

  await axios
    .request(options)
    .then((resp) => {
      list = resp.data.results;
    })
    .catch((error) => {
      console.error(error);
    });
  return list;
}
