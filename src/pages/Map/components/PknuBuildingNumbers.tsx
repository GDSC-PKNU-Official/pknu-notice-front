import { PKNU_BUILDINGS } from '@constants/pknu-map';
import useModals from '@hooks/useModals';
import useUserLocation from '@hooks/useUserLocation';
import { BuildingType } from '@type/map';

import NumberOverlay from '../handlers/overlay-handler';

interface BuildingNumbersProps {
  buildingTypes: BuildingType[];
  map: any;
}

const PknuBuildingNumbers = ({ map, buildingTypes }: BuildingNumbersProps) => {
  if (!map) {
    return null;
  }
  const location = useUserLocation();
  const { openModal, closeModal } = useModals();

  return (
    <>
      {Object.keys(PKNU_BUILDINGS).forEach((buildingType) => {
        if (!buildingTypes.includes(buildingType as BuildingType)) {
          const removeElements = document.querySelectorAll(
            `[class^=${buildingType}]`,
          );
          removeElements.forEach((removeElement) => {
            removeElement.remove();
          });
          return;
        }

        PKNU_BUILDINGS[buildingType as BuildingType].buildings.forEach(
          (PKNU_BUILDING, index) => {
            const buildingNumberOverlay = new NumberOverlay(
              PKNU_BUILDING,
              openModal,
              closeModal,
              location,
            ).createOverlay(buildingType as BuildingType, index);

            buildingNumberOverlay.setMap(map);
          },
        );
      })}
    </>
  );
};

export default PknuBuildingNumbers;
