import fetchBuildingInfo from '@apis/building-info/fetch-building-info';
import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { TotalFloorInfo } from '@type/building-info';
import { BuildingType } from '@type/map';
import { AxiosResponse } from 'axios';
import { CSSProperties, useEffect, useState } from 'react';

interface BuildingInfo {
  buildingCode: string;
  buildingName: string;
  latlng: [number, number];
  color: CSSProperties['color'];
}

const getBuildingInfo = (buildingNumber: string) => {
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

const useBuildingInfo = (buildingNumber: string) => {
  const [floorInfo, setFloorInfo] = useState<TotalFloorInfo>(
    {} as TotalFloorInfo,
  );

  const { buildingCode, buildingName, color, latlng } = getBuildingInfo(
    buildingNumber,
  ) as BuildingInfo;

  const buildingInfo = {
    buildingName,
    color,
    imgPath: `https://www.pknu.ac.kr/imageView.do?target=campus&cd=${buildingCode}`,
    latlng,
  };

  useEffect(() => {
    const getBuildingInfo = async () => {
      try {
        const response = (await fetchBuildingInfo(
          buildingCode as string,
        )) as AxiosResponse;
        const fetchedFloorInfo = response.data;

        setFloorInfo(fetchedFloorInfo as TotalFloorInfo);
      } catch (error) {
        return error;
      }
    };

    getBuildingInfo();
  }, []);

  return {
    floorInfo,
    buildingInfo,
  };
};

export default useBuildingInfo;
