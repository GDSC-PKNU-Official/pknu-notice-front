import { PKNU_MAP_CENTER_LOCATION } from '@constants/pknu-map';
import styled from '@emotion/styled';
import useLocationHandler from '@hooks/useLocationHandler';
import useModals from '@hooks/useModals';
import useUserLocation from '@hooks/useUserLocation';
import { useEffect, useState } from 'react';

import BuildingFilterButtons from './components/BuildingFilterButtons';
import MapHeader from './components/MapHeader';
import handleMapBoundary from './handlers/boundary';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const [map, setMap] = useState(null);
  const { openModal, closeModal } = useModals();
  const userLocation = useUserLocation();

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: PKNU_MAP_CENTER_LOCATION,
      level: 4,
      minLevel: 1,
      maxLevel: 4,
    };
    const map = new window.kakao.maps.Map(container as HTMLDivElement, options);
    setMap(map);
  }, []);

  useLocationHandler(map, openModal, closeModal);
  handleMapBoundary(map);

  return (
    <Container>
      <MapHeader map={map} />
      <KakaoMap id="map" />
      <BuildingFilterButtons map={map} userLocation={userLocation} />
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
