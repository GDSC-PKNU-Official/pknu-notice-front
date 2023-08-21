import styled from '@emotion/styled';
import useUserLocation from '@hooks/useUserLocation';
import { THEME } from '@styles/ThemeProvider/theme';
import { memo, useEffect, useState } from 'react';

import distanceHandler from '../handlers/distance-handler';

interface UserLocationProps {
  map: any;
}

const UserLocation = ({ map }: UserLocationProps) => {
  const userLocation = useUserLocation();
  const [roadAddress, setRoadAddress] = useState<string | null>(null);

  const marker = new window.kakao.maps.Marker({
    position:
      userLocation &&
      new window.kakao.maps.LatLng(userLocation.LAT, userLocation.LNG),
  });
  marker.setMap(map);

  function getAddr() {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(
      userLocation?.LAT,
      userLocation?.LNG,
    );
    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const { road_address } = { ...result }[0];
        setRoadAddress(road_address.address_name);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  useEffect(() => {
    getAddr();
  });

  return (
    <LocationMessage>
      {!userLocation ? (
        <span>위치 정보를 가져오고 있어요!</span>
      ) : (
        !distanceHandler(userLocation.LAT, userLocation.LNG) && (
          <div>
            <span>
              현재 학교 외부에 있어요! <br />
              길찾기 기능을 이용해보세요 <br />
              {roadAddress && <>현재 주소 : {roadAddress}</>}
            </span>
          </div>
        )
      )}
    </LocationMessage>
  );
};

export default memo(UserLocation);

const LocationMessage = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: ${THEME.TEXT.GRAY};

  & > div > span {
    line-height: 15px;
    font-size: 12px;
  }
`;
