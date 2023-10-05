import OverlayContext from '@contexts/overlays';
import { BuildingType, PKNUBuilding } from '@type/map';
import { useCallback, useContext } from 'react';

const useOverlays = () => {
  const overlayContext = useContext(OverlayContext);
  if (!overlayContext) {
    throw new Error('OverlayContext does not exists.');
  }

  const customOverlay = overlayContext;

  const addOverlay = useCallback(
    (buildingType: BuildingType, building: PKNUBuilding, map: any) => {
      customOverlay.addOverlay(buildingType, building, map);
    },
    [customOverlay],
  );

  const handleOverlays = useCallback(
    (activeTypes: Record<BuildingType, boolean>, map: any) => {
      customOverlay.handleOverlays(activeTypes, map);
    },
    [customOverlay],
  );

  return {
    addOverlay,
    handleOverlays,
  };
};

export default useOverlays;
