import { PKNU_MAP_CENTER } from '@constants/pknu-map';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import MapboundaryObserver from './MapboundaryObserver';
import MapLevelObserver from './MapLevelObserver';
import PknuBuildingNumbers from './PknuBuildingNumbers';
import UserLocation from './UserLocation';

// TODO
// 1. 사용자 현재위치를 표시한다.
// ! HTML5 GeoLocation을 통해서 사용자의 접속위치를 기준으로 현 위치 정보를 얻어오기 때문에, https || localhost 환경에서만 동작한다.
// 1-1. 현재위치를 표시하고 건물번호 클릭 이벤트가 발생하면, 길찾기 기능을 추가한다.
// 1-2. 사용자의 현재 위치를 가져오는데, 생각보다 많은 시간이 걸린다 사용자의 위치를 파악하기전 UX를 개선할 수 있는 방향을 생각한다.

// * useUserLocation 훅
// navigator가 사용이 가능하면, 사용자의 현재 위치를 가져옴.
// 사용자의 현재위치를 가져오면, 그 위치를 기반으로 지도를 다시 렌더링 한다.

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
    const map = new window.kakao.maps.Map(container as HTMLDivElement, options);
    setMap(map);
  }, []);

  return (
    <div
      css={css`
        height: calc(100vh - 16vh);
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <KakaoMap id="map" />
      <UserLocation map={map} />
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

interface UserLocation {
  latitude: number;
  longitude: number;
}

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;
