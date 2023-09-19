import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { PKNU_MAP_CENTER_LOCATION, PKNU_MAP_LIMIT } from '@constants/pknu-map';
import { CloseModal, OpenModal, modals } from '@hooks/useModals';
import { Location } from '@type/map';

type MapLimitHandler = (
  map: any,
  openModal: OpenModal,
  closeModal: CloseModal,
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
    openModal<typeof modals.alert>(modals.alert, {
      message: MODAL_MESSAGE.ALERT.OVER_MAP_LEVEL,
      buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
      onClose: () => closeModal(modals.alert),
    });
  };
  window.kakao.maps.event.addListener(map, 'zoom_changed', levelLimitHandler);
  return null;
};

const boundaryHandler = (
  map: any,
  openModal: OpenModal,
  closeModal: CloseModal,
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
      openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.OVER_MAP_BOUNDARY,
        buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
        onClose: () => closeModal(modals.alert),
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
