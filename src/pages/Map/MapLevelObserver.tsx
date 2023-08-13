import AlertModal from '@components/Modal/AlertModal';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import { PKNU_MAP_LIMIT } from '@constants/pknu-map';
import useModals from '@hooks/useModals';
import React, { useEffect } from 'react';

interface MapLevelObserverProps {
  map: any;
  centerLocation: any;
}

const MapLevelObserver = ({ map, centerLocation }: MapLevelObserverProps) => {
  if (!map) {
    return null;
  }
  const { openModal, closeModal } = useModals();

  const levelLimitHandler = () => {
    if (map.getLevel() <= PKNU_MAP_LIMIT.LEVEL) {
      return;
    }
    map.setLevel(PKNU_MAP_LIMIT.LEVEL);
    map.setCenter(centerLocation);
    openModal(AlertModal, {
      message: MODAL_MESSAGE.ALERT.OVER_MAP_LEVEL,
      buttonMessage: '닫기',
      onClose: () => closeModal(AlertModal),
    });
  };
  window.kakao.maps.event.addListener(map, 'zoom_changed', levelLimitHandler);

  return null;
};

export default MapLevelObserver;
