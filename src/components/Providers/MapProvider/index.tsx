import PknuMapContext from '@contexts/map';
import UserLocationContext from '@contexts/user-location';
import styled from '@emotion/styled';
import {
  FilterButtons,
  MapHeader,
  PknuMap,
  RefreshButtons,
} from '@pages/Map/components';
import BuildingInfoToggle from '@pages/Map/components/BuildingInfo/BuildingInfoToggle';
import { Location } from '@type/map';
import React, { useState } from 'react';

import OverlayProvider from '../OverlayProvider';

interface MapProps {
  children: React.ReactNode;
}

const Map = ({ children }: MapProps) => {
  const [map, setMap] = useState<any | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  return (
    <PknuMapContext.Provider value={{ map, setMap }}>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <OverlayProvider>
          <MapContainer>{children}</MapContainer>
        </OverlayProvider>
      </UserLocationContext.Provider>
    </PknuMapContext.Provider>
  );
};

export default Map;

Map.PknuMap = PknuMap;
Map.MapHeader = MapHeader;
Map.FilterButtons = FilterButtons;
Map.RefreshButtons = RefreshButtons;
Map.BuildingInfoToggle = BuildingInfoToggle;

const MapContainer = styled.div`
  overflow: hidden;
  max-width: 480px;
  min-height: 100vh;
  height: calc(100vh - 8vh);
  display: flex;
  flex-direction: column;
  position: relative;
`;
