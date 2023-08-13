import AlertModal from '@components/Modal/AlertModal';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import { PKNU_MAP_LIMIT } from '@constants/pknu-map';
import useModals from '@hooks/useModals';
import React, { useEffect } from 'react';

interface MapBounds {
  map: any;
  centerLocation: any;
}

// ! useEffect 훅이 두번 호출되는 문제 해결

const MapboundaryObserver = ({ map, centerLocation }: MapBounds) => {
  if (!map) {
    return null;
  }
  const { openModal, closeModal } = useModals();

  const boundayLimitHandler = () => {
    const { La, Ma } = map.getCenter();
    if (
      Ma >= PKNU_MAP_LIMIT.TOP ||
      La >= PKNU_MAP_LIMIT.RIGHT ||
      Ma <= PKNU_MAP_LIMIT.BOTTOM ||
      La <= PKNU_MAP_LIMIT.LEFT
    ) {
      map.setLevel(4);
      map.setCenter(centerLocation);
      openModal(AlertModal, {
        message: MODAL_MESSAGE.ALERT.OVER_MAP_BOUNDARY,
        buttonMessage: '닫기',
        onClose: () => closeModal(AlertModal),
      });
    }
  };

  window.kakao.maps.event.addListener(map, 'dragend', boundayLimitHandler);

  return null;
};

MapboundaryObserver.__isStatic = true;

export default MapboundaryObserver;
