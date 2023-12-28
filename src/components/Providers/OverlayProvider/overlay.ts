import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType, Location, PKNUBuilding } from '@type/map';
import { hasLocationPermission } from '@utils/map';
import openLink from '@utils/router/openLink';
import { CSSProperties } from 'react';

interface ICustomOverlay {
  handleOverlays(buildingTypes: Record<BuildingType, boolean>, map: any): void;
  addOverlay(
    buildingType: BuildingType,
    building: PKNUBuilding,
    map: any,
  ): void;
}

type OpenModal = (
  title: string,
  btn1Text: string,
  onClick?: () => void,
  btn2Text?: string,
) => void;

class CustomOverlay implements ICustomOverlay {
  private overlays: Record<BuildingType, any[]>;
  private openModal: OpenModal;
  private userLocation: Location | null;

  constructor(openModal: OpenModal, userLocation: Location | null) {
    this.openModal = openModal;
    this.userLocation = userLocation;
    this.overlays = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
    };
  }

  private isOverlayInMap(buildingType: BuildingType, building: PKNUBuilding) {
    const type = buildingType as keyof typeof this.overlays;
    if (this.overlays[type].length === 0) return false;
    this.overlays[type].forEach((overlay) => {
      if (overlay.cc.innerText === building.buildingName) return true;
    });

    return false;
  }

  private isAllOverlayInMap(type: BuildingType) {
    return this.overlays[type].length >= PKNU_BUILDINGS[type].buildings.length;
  }

  private openNoLocationModal() {
    this.openModal(
      MODAL_MESSAGE.ALERT.NO_LOCATION_PERMISSON,
      MODAL_BUTTON_MESSAGE.CLOSE,
    );
  }

  private openConfirmRoutingModal(buildingInfo: PKNUBuilding) {
    const { buildingNumber, buildingName, latlng } = buildingInfo;
    const [lat, lng] = latlng;

    const kakaoMapAppURL = `kakaomap://route?sp=${this.userLocation?.LAT},${this.userLocation?.LNG}&ep=${lat},${lng}`;
    const kakaoMapWebURL = `https://map.kakao.com/link/from/현위치,${this.userLocation?.LAT},${this.userLocation?.LNG}/to/${buildingName},${lat},${lng}`;
    const isKakaoMapInstalled = /KAKAOMAP/i.test(navigator.userAgent);
    const openUrl = isKakaoMapInstalled ? kakaoMapAppURL : kakaoMapWebURL;

    this.openModal(
      `목적지(${buildingNumber})로 길찾기를 시작할까요?`,
      MODAL_BUTTON_MESSAGE.NO,
      () => openLink(openUrl),
      MODAL_BUTTON_MESSAGE.YES,
    );
  }

  private handleRoutingModal(building: PKNUBuilding) {
    if (!this.userLocation) return;

    hasLocationPermission(this.userLocation)
      ? this.openConfirmRoutingModal(building)
      : this.openNoLocationModal();
  }

  private createOverlayContent(
    activeColor: CSSProperties['color'],
    building: PKNUBuilding,
  ) {
    const content = document.createElement('span') as HTMLSpanElement;
    Object.assign(content.style, {
      backgroundColor: `${activeColor}`,
      color: THEME.TEXT.WHITE,
      padding: '5px',
      borderRadius: '8px',
      fontSize: '10px',
      fontWeight: 'bold',
    });
    const buildingNumberText = document.createTextNode(building.buildingNumber);
    content.appendChild(buildingNumberText);
    content.onclick = () => this.handleRoutingModal(building);

    return content;
  }

  private createOverlay(type: BuildingType, building: PKNUBuilding) {
    const overlayContent = this.createOverlayContent(
      PKNU_BUILDINGS[type].activeColor,
      building,
    );
    const overlay = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(
        building.latlng[0],
        building.latlng[1],
      ),
      content: overlayContent,
      removable: false,
      yAnchor: -0.05,
    });

    return overlay;
  }

  private getTypeOverlays(buildingType: BuildingType, map: any) {
    const type = buildingType as keyof typeof this.overlays;
    const typeOverlays: any[] = [];

    PKNU_BUILDINGS[type].buildings.forEach((building) => {
      const overlay = this.createOverlay(type, building);
      overlay.setMap(map);
      typeOverlays.push(overlay);
    });

    return typeOverlays;
  }

  addOverlay(buildingType: BuildingType, building: PKNUBuilding, map: any) {
    const type = buildingType as keyof typeof this.overlays;
    if (!this.isOverlayInMap(buildingType, building)) {
      const overlay = this.createOverlay(buildingType, building);
      overlay.setMap(map);
      this.overlays = {
        ...this.overlays,
        [type]: [...this.overlays[type], overlay],
      };
    }
  }

  handleOverlays(activeTypes: Record<BuildingType, boolean>, map: any) {
    const newOverlays: Record<BuildingType, any[]> = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
    };

    Object.keys(activeTypes).forEach((activeType) => {
      const type = activeType as keyof typeof this.overlays;

      if (!activeTypes[type]) {
        if (!this.isAllOverlayInMap(type)) {
          newOverlays[type] = [...this.overlays[type]];
          return;
        }
        this.overlays[type].forEach((overlay) => {
          overlay.setMap(null);
        });
        return;
      }

      if (this.isAllOverlayInMap(type)) {
        newOverlays[type] = [...this.overlays[type]];
        return;
      }

      const typeOverlays = this.getTypeOverlays(type, map);
      newOverlays[type] = [...this.overlays[type], ...typeOverlays];
    });

    this.overlays = newOverlays;
  }
}

export default CustomOverlay;
