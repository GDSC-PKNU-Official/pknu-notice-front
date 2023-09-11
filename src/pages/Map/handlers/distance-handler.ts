import { PKNU_MAP_CENTER } from '@constants/pknu-map';

const deg2rad = (deg: number) => deg * (Math.PI / 180);

const haversineDistance = (lat: number, lng: number) => {
  const R = 6371000;

  const dLat = deg2rad(PKNU_MAP_CENTER.LAT - lat);
  const dLon = deg2rad(PKNU_MAP_CENTER.LNG - lng);

  const halfSideLength =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(PKNU_MAP_CENTER.LAT)) *
      Math.cos(deg2rad(lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const angularDistance =
    2 * Math.atan2(Math.sqrt(halfSideLength), Math.sqrt(1 - halfSideLength));

  return R * angularDistance;
};

const isUserInSchool = (lat: number, lng: number) => {
  const maxDistance = 450;
  return haversineDistance(lat, lng) <= maxDistance;
};

export default isUserInSchool;
