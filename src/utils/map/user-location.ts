import { NO_PROVIDE_LOCATION, PKNU_MAP_CENTER } from '@constants/pknu-map';
import { Location } from '@type/map';

const degreeToRadian = (deg: number) => deg * (Math.PI / 180);

const getHaversineDistance = (lat: number, lng: number) => {
  const R = 6371000;

  const dLat = degreeToRadian(PKNU_MAP_CENTER.LAT - lat);
  const dLon = degreeToRadian(PKNU_MAP_CENTER.LNG - lng);

  const halfSideLength =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreeToRadian(PKNU_MAP_CENTER.LAT)) *
      Math.cos(degreeToRadian(lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const angularDistance =
    2 * Math.atan2(Math.sqrt(halfSideLength), Math.sqrt(1 - halfSideLength));

  return R * angularDistance;
};

export const hasLocationPermission = (location: Location | null) => {
  return (
    location && JSON.stringify(location) !== JSON.stringify(NO_PROVIDE_LOCATION)
  );
};

export const isUserInShcool = (lat: number, lng: number) => {
  const maxDistance = 450;
  return getHaversineDistance(lat, lng) <= maxDistance;
};
