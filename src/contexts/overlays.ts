import { BuildingType, PKNUBuilding } from '@type/map';
import { createContext } from 'react';

interface Overlay {
  handleOverlays(buildingTypes: Record<BuildingType, boolean>, map: any): void;
  addOverlay(
    buildingType: BuildingType,
    building: PKNUBuilding,
    map: any,
  ): void;
}

const OverlayContext = createContext<Overlay | null>(null);

export default OverlayContext;
