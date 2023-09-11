import { PKNU_BUILDINGS } from '@constants/pknu-map';
import useModals from '@hooks/useModals';
import { BuildingType, Location } from '@type/map';
import { memo } from 'react';

import NumberOverlay from '../handlers/overlay-handler';

interface BuildingNumbersProps {
  buildingTypes: BuildingType[];
  map: any;
  location: Location | null;
}

type BuildingOverlay = {
  [key in BuildingType]?: any[];
};
const buildingOverlays: BuildingOverlay = {};

const PknuBuildingNumbers = ({
  map,
  buildingTypes,
  location,
}: BuildingNumbersProps) => {
  if (!map || !location) {
    return <></>;
  }

  const { openModal, closeModal } = useModals();
  const isOverlayInMap = (type: BuildingType) => {
    return Object.prototype.hasOwnProperty.call(buildingOverlays, type);
  };

  return (
    <>
      {Object.keys(buildingOverlays).forEach((buildingType) => {
        buildingOverlays[buildingType as BuildingType]?.forEach((overlay) => {
          overlay.setMap(map);
        });
      })}
      {Object.keys(PKNU_BUILDINGS).forEach((buildingType) => {
        if (!buildingTypes.includes(buildingType as BuildingType)) {
          if (!isOverlayInMap(buildingType as BuildingType)) return;
          buildingOverlays[buildingType as BuildingType]?.forEach((overlay) =>
            overlay.setMap(null),
          );
          delete buildingOverlays[buildingType as BuildingType];
          return;
        }
        if (isOverlayInMap(buildingType as BuildingType)) return;

        const overlays: any[] = [];
        PKNU_BUILDINGS[buildingType as BuildingType].buildings.forEach(
          (PKNU_BUILDING) => {
            const buildingNumberOverlay = new NumberOverlay(
              PKNU_BUILDING,
              openModal,
              closeModal,
              location,
            ).createOverlay(buildingType as BuildingType);
            overlays.push(buildingNumberOverlay);
            buildingNumberOverlay.setMap(map);
          },
        );
        buildingOverlays[buildingType as BuildingType] = overlays;
      })}
    </>
  );
};

export default memo(PknuBuildingNumbers);
