import { PKNU_MAP_CENTER } from '@constants/pknu-map';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModals from '@hooks/useModals';
import { BuildingType } from '@type/map';
import { useEffect, useState } from 'react';

import BuildingFilterButtons from './components/BuildingFilterButtons';
import MapHeader from './components/MapHeader';
import PknuBuildingNumbers from './components/PknuBuildingNumbers';
import UserLocation from './components/UserLocation';
import { mapBoundaryHandler, mapLevelHandler } from './handlers/limit-handler';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const { openModal, closeModal } = useModals();
  const [map, setMap] = useState(null);
  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>(['A']);

  const PKNU_MAP_CENTER_LOCATION = new window.kakao.maps.LatLng(
    PKNU_MAP_CENTER.LAT,
    PKNU_MAP_CENTER.LNG,
  );
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: PKNU_MAP_CENTER_LOCATION,
      level: 4,
    };
    const map = new window.kakao.maps.Map(container as HTMLDivElement, options);
    setMap(map);
  }, []);
  mapLevelHandler(map, PKNU_MAP_CENTER_LOCATION, openModal, closeModal);
  mapBoundaryHandler(map, PKNU_MAP_CENTER_LOCATION, openModal, closeModal);

  return (
    <div
      css={css`
        height: calc(100vh - 8vh);
        display: flex;
        flex-direction: column;
      `}
    >
      <MapHeader map={map} />
      <KakaoMap id="map" />
      <PknuBuildingNumbers map={map} buildingTypes={buildingTypes} />
      <MapFooter>
        <BuildingFilterButtons
          buildingTypes={buildingTypes}
          setBuildingTypes={setBuildingTypes}
        />
        <UserLocation map={map} />
      </MapFooter>
    </div>
  );
};

export default Map;

const MapFooter = styled.div`
  height: 8vh;
  display: flex;
`;

const KakaoMap = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 15px;
`;
