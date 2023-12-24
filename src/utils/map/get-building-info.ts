import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { BuildingType } from '@type/map';

const getBuildingInfo = (
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

export default getBuildingInfo;
