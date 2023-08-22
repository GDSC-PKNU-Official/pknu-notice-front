import AlertModal from '@components/Modal/AlertModal';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import { PKNU_MAP_LIMIT } from '@constants/pknu-map';
import { ComponentProps, FunctionComponent } from 'react';

type MapLimitHandler = (
  map: any,
  centerLocation: any,
  openModal: (
    Component: FunctionComponent<any>,
    props: Omit<ComponentProps<any>, 'open'>,
  ) => void,
  closeModal: (Component: FunctionComponent<any>) => void,
) => void;

export const mapLevelHandler: MapLimitHandler = (
  map,
  centerLocation,
  openModal,
  closeModal,
) => {
  if (!map) {
    return null;
  }

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

export const mapBoundaryHandler: MapLimitHandler = (
  map,
  centerLocation,
  openModal,
  closeModal,
) => {
  if (!map) {
    return null;
  }

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
};
