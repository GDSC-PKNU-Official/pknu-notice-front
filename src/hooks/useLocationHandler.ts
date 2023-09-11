import AlertModal from '@components/Modal/AlertModal';
import { NO_PROVIDE_LOCATION } from '@constants/pknu-map';
import isUserInSchool from '@pages/Map/handlers/distance-handler';
import { Location } from '@type/map';
import { ComponentProps, FunctionComponent, useEffect, useState } from 'react';

import useUserLocation from './useUserLocation';

type UserLocationHandler = (
  map: any,
  openModal: (
    Component: FunctionComponent<any>,
    props: Omit<ComponentProps<any>, 'open'>,
  ) => void,
  closeModal: (Component: FunctionComponent<any>) => void,
) => void;

const hasLocationPermission = (location: Location | null) => {
  return !location ||
    JSON.stringify(location) === JSON.stringify(NO_PROVIDE_LOCATION)
    ? false
    : true;
};

const useLocationHandler: UserLocationHandler = (
  map,
  openModal,
  closeModal,
) => {
  const [roadAddress, setRoadAddress] = useState<string | null>(null);
  const location = useUserLocation();

  function getUserRoadAddress() {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord =
      location && new window.kakao.maps.LatLng(location.LAT, location.LNG);
    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const { road_address } = { ...result }[0];
        setRoadAddress(road_address.address_name);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  useEffect(() => {
    if (!map) return;
    if (!location) {
      return openModal(AlertModal, {
        message: '위치 정보를 가져오는 중입니다...',
      });
    }
    closeModal(AlertModal);

    if (!hasLocationPermission(location)) {
      return openModal(AlertModal, {
        message:
          '위치정보를 제공하지 않아 \n길찾기 기능을 이용하실 수 없습니다.',
        buttonMessage: '닫기',
        onClose: () => closeModal(AlertModal),
      });
    }

    location && getUserRoadAddress();
    if (location && !isUserInSchool(location.LAT, location.LNG)) {
      if (roadAddress) {
        return openModal(AlertModal, {
          message: `학교 외부에 있어요!\n 길찾기 기능을 이용해주세요.\n 현재주소 : ${roadAddress}`,
          buttonMessage: '닫기',
          onClose: () => closeModal(AlertModal),
        });
      }
    }
    const userLocationMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(location.LAT, location.LNG),
    });
    userLocationMarker.setMap(map);
  }, [map, location, roadAddress]);
};

export default useLocationHandler;
