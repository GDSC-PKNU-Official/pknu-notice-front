import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { NO_PROVIDE_LOCATION, PKNU_BUILDINGS } from '@constants/pknu-map';
import { CloseModal, OpenModal, modals } from '@hooks/useModals';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType, Location, PKNUBuilding } from '@type/map';

class NumberOverlay {
  private PKNU_BUILDING: PKNUBuilding;
  private openModal: OpenModal;
  private closeModal: CloseModal;
  private userLocation: Location | null;

  constructor(
    PKNU_BUILDING: PKNUBuilding,
    openModal: OpenModal,
    closeModal: CloseModal,
    userLocation: Location | null,
  ) {
    this.PKNU_BUILDING = PKNU_BUILDING;
    this.openModal = openModal;
    this.closeModal = closeModal;
    this.userLocation = userLocation;
  }

  private routeHandler() {
    const {
      buildingName,
      buildingNumber,
      latlng: [lat, lng],
    } = this.PKNU_BUILDING;
    const routeUrl = !this.userLocation
      ? ''
      : `https://map.kakao.com/link/from/내위치,${this.userLocation.LAT},${this.userLocation.LNG}/to/${buildingName},${lat},${lng}`;

    JSON.stringify(this.userLocation) !== JSON.stringify(NO_PROVIDE_LOCATION)
      ? this.openModal<typeof modals.confirm>(modals.confirm, {
          message: `목적지(${buildingNumber})로 길찾기를 시작할까요?`,
          onConfirmButtonClick: () => {
            window.open(routeUrl, '_blank');
            this.closeModal(modals.confirm);
          },
          onCancelButtonClick: () => this.closeModal(modals.confirm),
        })
      : this.openModal<typeof modals.alert>(modals.alert, {
          message: MODAL_MESSAGE.ALERT.NO_LOCATION_PERMISSON,
          buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
          onClose: () => this.closeModal(modals.alert),
        });
  }

  private createOverlayContent(buildingType: BuildingType) {
    const content = document.createElement('span') as HTMLSpanElement;
    Object.assign(content.style, {
      backgroundColor: `${PKNU_BUILDINGS[buildingType].activeColor}`,
      color: THEME.TEXT.WHITE,
      padding: '5px',
      borderRadius: '8px',
      fontSize: '10px',
      fontWeight: 'bold',
    });
    const buildingNumber = document.createTextNode(
      this.PKNU_BUILDING.buildingNumber,
    );
    content.appendChild(buildingNumber);
    content.onclick = () => this.routeHandler();

    return content;
  }

  createOverlay(buildingType: BuildingType) {
    const overlayContent = this.createOverlayContent(buildingType);
    return new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(
        this.PKNU_BUILDING.latlng[0],
        this.PKNU_BUILDING.latlng[1],
      ),
      content: overlayContent,
      removable: false,
      yAnchor: -0.05,
    });
  }
}

export default NumberOverlay;
