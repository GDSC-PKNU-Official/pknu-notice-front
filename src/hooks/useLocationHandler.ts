import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { NO_PROVIDE_LOCATION } from '@constants/pknu-map';
import isUserInSchool from '@pages/Map/handlers/distance-handler';
import { Location } from '@type/map';
import { useEffect, useState } from 'react';

import { CloseModal, OpenModal, modals } from './useModals';
import useUserLocation from './useUserLocation';

type UserLocationHandler = (
  map: any,
  openModal: OpenModal,
  closeModal: CloseModal,
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
      return openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.GET_LOCATION,
      });
    }
    closeModal(modals.alert);

    if (!hasLocationPermission(location)) {
      return openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.NO_LOCATION_PERMISSON,
        buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
        onClose: () => closeModal(modals.alert),
      });
    }

    location && getUserRoadAddress();
    if (location && !isUserInSchool(location.LAT, location.LNG)) {
      if (roadAddress) {
        return openModal<typeof modals.alert>(modals.alert, {
          message: `${MODAL_MESSAGE.ALERT.OUTSIDE_SCHOOL} : ${roadAddress}`,
          buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
          onClose: () => closeModal(modals.alert),
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
