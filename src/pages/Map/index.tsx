import { PKNU_MAP_CENTER_LOCATION } from '@constants/pknu-map';
import styled from '@emotion/styled';
import useLocationHandler from '@hooks/useLocationHandler';
import useModals from '@hooks/useModals';
import useUserLocation from '@hooks/useUserLocation';
import { BuildingType } from '@type/map';
import { useEffect, useState } from 'react';

import BuildingFilterButtons from './components/BuildingFilterButtons';
import MapHeader from './components/MapHeader';
import PknuBuildingNumbers from './components/PknuBuildingNumbers';
import mapLimitHandler from './handlers/limit-handler';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const [map, setMap] = useState(null);
  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>(['A']);
  const { openModal, closeModal } = useModals();
  const location = useUserLocation();
  useLocationHandler(map, openModal, closeModal);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: PKNU_MAP_CENTER_LOCATION,
      level: 4,
    };
    const map = new window.kakao.maps.Map(container as HTMLDivElement, options);
    setMap(map);
  }, []);
  mapLimitHandler.levelHandler(map, openModal, closeModal);
  mapLimitHandler.boundaryHandler(map, openModal, closeModal, location);

  return (
    <Container>
      <MapHeader map={map} />
      <KakaoMap id="map" />
      <PknuBuildingNumbers
        map={map}
        buildingTypes={buildingTypes}
        location={location}
      />
      <BuildingFilterButtons
        map={map}
        location={location}
        buildingTypes={buildingTypes}
        setBuildingTypes={setBuildingTypes}
      />
    </Container>
  );
};

export default Map;

const Container = styled.section`
  height: calc(100vh - 8vh);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const KakaoMap = styled.div`
  height: calc(100vh - 90px);
  width: 100%;
`;
