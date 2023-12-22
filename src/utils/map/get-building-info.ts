import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { BuildingType } from '@type/map';

const getBuildingInfo = (
  keyword: string,
): [BuildingType, number] | undefined => {
  const splittedKeyword = keyword.split(' ').join('').toUpperCase();

  for (const buildingType of Object.keys(PKNU_BUILDINGS)) {
    const index = PKNU_BUILDINGS[
      buildingType as BuildingType
    ].buildings.findIndex(
      (PKNU_BUILDING) =>
        PKNU_BUILDING.buildingName === splittedKeyword ||
        PKNU_BUILDING.buildingNumber === splittedKeyword,
    );
    if (index !== -1) return [buildingType as BuildingType, index];
  }

  return;
};

export default getBuildingInfo;
