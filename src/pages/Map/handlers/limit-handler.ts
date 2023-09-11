import AlertModal from '@components/Modal/AlertModal';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import { PKNU_MAP_CENTER_LOCATION, PKNU_MAP_LIMIT } from '@constants/pknu-map';
import { Location } from '@type/map';
import { ComponentProps, FunctionComponent } from 'react';

type MapLimitHandler = (
  map: any,
  openModal: (
    Component: FunctionComponent<any>,
    props: Omit<ComponentProps<any>, 'open'>,
  ) => void,
  closeModal: (Component: FunctionComponent<any>) => void,
) => void;

const levelHandler: MapLimitHandler = (map, openModal, closeModal) => {
  if (!map) {
    return null;
  }

  const levelLimitHandler = () => {
    if (map.getLevel() <= PKNU_MAP_LIMIT.LEVEL) {
      return;
    }
    map.setLevel(PKNU_MAP_LIMIT.LEVEL);
    map.setCenter(PKNU_MAP_CENTER_LOCATION);
    openModal(AlertModal, {
      message: MODAL_MESSAGE.ALERT.OVER_MAP_LEVEL,
      buttonMessage: '닫기',
      onClose: () => closeModal(AlertModal),
    });
  };
  window.kakao.maps.event.addListener(map, 'zoom_changed', levelLimitHandler);
  return null;
};

const boundaryHandler = (
  map: any,
  openModal: (
    Component: FunctionComponent<any>,
    props: Omit<ComponentProps<any>, 'open'>,
  ) => void,
  closeModal: (Component: FunctionComponent<any>) => void,
  location: Location | null,
) => {
  if (!map || !location) {
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
      map.setCenter(PKNU_MAP_CENTER_LOCATION);
      openModal(AlertModal, {
        message: MODAL_MESSAGE.ALERT.OVER_MAP_BOUNDARY,
        buttonMessage: '닫기',
        onClose: () => closeModal(AlertModal),
      });
    }
  };

  window.kakao.maps.event.addListener(map, 'dragend', boundayLimitHandler);
};

const mapLimitHandler = {
  levelHandler,
  boundaryHandler,
};

export default mapLimitHandler;
