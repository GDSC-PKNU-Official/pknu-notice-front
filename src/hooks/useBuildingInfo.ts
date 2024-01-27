import fetchBuildingInfo from '@apis/building-info/fetch-building-info';
import { TotalFloorInfo } from '@type/building-info';
import { getBuildingInfo } from '@utils/map/building-info';
import { AxiosResponse } from 'axios';
import { CSSProperties, useEffect, useState } from 'react';

interface BuildingInfo {
  buildingCode: string;
  buildingName: string;
  latlng: [number, number];
  color: CSSProperties['color'];
}

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
