import { PKNU_BUILDINGS } from '@constants/pknu-map';
import React from 'react';

interface BuildingNumbersProps {
  map: any;
}

const PknuBuildingNumbers = ({ map }: BuildingNumbersProps) => {
  if (!map) {
    return null;
  }

  return (
    <>
      {PKNU_BUILDINGS.forEach((PKNU_BUILDING) => {
        new window.kakao.maps.CustomOverlay({
          map: map,
          position: new window.kakao.maps.LatLng(
            PKNU_BUILDING.latlng[0],
            PKNU_BUILDING.latlng[1],
          ),
          content: `<span style="display: block; background: #71BC5C; color: #fff; text-align: center; padding: 5px; border-radius: 8px; font-size:12px; font-weight: bold;">
          ${PKNU_BUILDING.buildingNumber}
        </span>`,
          removable: false,
          yAnchor: -0.05,
        });
      })}
    </>
  );
};

export default PknuBuildingNumbers;
