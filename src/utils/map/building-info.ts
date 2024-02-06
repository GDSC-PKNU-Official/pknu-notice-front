import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { Floor } from '@type/building-info';
import { BuildingType, Location } from '@type/map';

export const getBuildingSearchResult = (
  keyword: string,
): [BuildingType, number] | undefined => {
  const formattedKeyword = keyword.replaceAll(' ', '').toUpperCase();

  for (const buildingType of Object.keys(PKNU_BUILDINGS)) {
    const index = PKNU_BUILDINGS[
      buildingType as BuildingType
    ].buildings.findIndex(
      (PKNU_BUILDING) =>
        PKNU_BUILDING.buildingName === formattedKeyword ||
        PKNU_BUILDING.buildingNumber === formattedKeyword,
    );

    if (index !== -1) return [buildingType as BuildingType, index];
  }

  return;
};

export const getBuildingInfo = (buildingNumber: string) => {
  const buildingTypes = Object.keys(PKNU_BUILDINGS) as BuildingType[];

  for (const type of buildingTypes) {
    for (const building of PKNU_BUILDINGS[type].buildings) {
      if (building.buildingNumber !== buildingNumber) continue;

      return {
        buildingCode: building.buildingCode,
        buildingName: building.buildingName,
        color: PKNU_BUILDINGS[type].activeColor,
        latlng: building.latlng,
      };
    }
  }
};

export const forrmatRoutingUrl = (
  userLocation: Location | null,
  latlng: [number, number],
  buildingName: string,
): string => {
  if (!userLocation) return '';

  const { LAT, LNG } = userLocation;
  const [lat, lng] = latlng;

  const kakaoMapAppURL = `kakaomap://route?sp=${LAT},${LNG}&ep=${lat},${lng}`;
  const kakaoMapWebURL = `https://map.kakao.com/link/from/현위치,${LAT},${LNG}/to/${buildingName},${lat},${lng}`;
  const isKakaoMapInstalled = /KAKAOMAP/i.test(navigator.userAgent);
  const openUrl = isKakaoMapInstalled ? kakaoMapAppURL : kakaoMapWebURL;

  return openUrl;
};

export const formatFloorTitle = (type: Floor, floor: string): string => {
  if (type === 'basement') return `B${floor}F`;
  if (type === 'ground') return `${floor}F`;
  if (type === 'rooftop') return `R${floor}F`;
  return '';
};
