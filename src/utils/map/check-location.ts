import { getHaversineDistance } from '@pages/Map/handlers';

const isUserInShcool = (lat: number, lng: number) => {
  const maxDistance = 450;
  return getHaversineDistance(lat, lng) <= maxDistance;
};

export default isUserInShcool;
