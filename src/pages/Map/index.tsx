import { PKNU_MAP_CENTER } from '@constants/pknu-map';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import MapboundaryObserver from './MapboundaryObserver';
import MapLevelObserver from './MapLevelObserver';
import PknuBuildingNumbers from './PknuBuildingNumbers';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const [map, setMap] = useState(null);
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
    const map = new window.kakao.maps.Map(container, options);
    setMap(map);
  }, []);

  return (
    <div
      css={css`
        height: calc(90vh - 40px);
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <KakaoMap id="map" />
      <PknuBuildingNumbers map={map} />
      <MapLevelObserver map={map} centerLocation={PKNU_MAP_CENTER_LOCATION} />
      <MapboundaryObserver
        map={map}
        centerLocation={PKNU_MAP_CENTER_LOCATION}
      />
    </div>
  );
};

export default Map;

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;
