import { MODAL_MESSAGE } from '@constants/modal-messages';
import { isUserInShcool } from '@utils/map';
import { useEffect } from 'react';

import { CloseModal, OpenModal, modals } from './useModals';
import useUserLocation from './useUserLocation';

type UserLocationHandler = (
  map: any,
  openModal: OpenModal,
  closeModal: CloseModal,
) => void;

const useLocationHandler: UserLocationHandler = (
  map,
  openModal,
  closeModal,
) => {
  const userLocation = useUserLocation();

  useEffect(() => {
    if (!map) return;
    if (!userLocation) {
      return openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.GET_LOCATION,
      });
    }
    closeModal(modals.alert);

    if (!isUserInShcool(userLocation.LAT, userLocation.LNG)) return;
    const userLocationMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(
        userLocation.LAT,
        userLocation.LNG,
      ),
    });
    userLocationMarker.setMap(map);
  }, [map, userLocation]);
};

export default useLocationHandler;
