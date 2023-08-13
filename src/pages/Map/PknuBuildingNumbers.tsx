import ConfirmModal from '@components/Modal/ConfirmModal';
import { PKNU_BUILDINGS } from '@constants/pknu-map';
import useModals from '@hooks/useModals';
import useUserLocation from '@hooks/useUserLocation';
import React from 'react';

interface BuildingNumbersProps {
  map: any;
}

// document.createElement를 사용한 이유
// 1. 기존에는 문자열을 사용해서 HMTLElement를 만들었는데, 이 방식을 사용하면 클릭 이벤트를 사용하는 것에 불편함이 많다.
// 2. JSX를 반환하는 함수형 컴포넌트를 content로 사용하려고 했지만 카카오 지도 API를 활용할 때, JSX를 사용할 수 없다.
// 3. DOM을 직접 만들어서 사용하는 방식은 클릭 이벤트를 다루기도 쉽고 카카오 지도 API에도 활용할 수 있어서 사용하기로 판단했다.

// 길찾기 기능 구현 - 완료
// 1. 커스텀오버레이 + 인포윈도우를 같이 사용하려 했으나 인포윈도우는 마커를 사용하는 경우에만 쉽게사용할 수 있어 2개의 커스텀 오버레이를 활용한다.
// 2. 건물번호를 클릭하면 '길찾기' 커스텀오버레이를 띄우고, 길찾기를 클릭하면 길찾기를 시작할지를 묻는 모달을 렌더링 한다
// 3. 사용자가 길찾기를 클릭하면 웹(URL) 스키마를 사용해서 길찾기를 할 수 있도록 돕는다.
// 4. 카카오맵이 설치되지 않을경우에 대한 예외 처리를 해야 한다

// ! 사용자 위치를 가져 오는 동안 다른 컴포넌트를 보여줌으로서 사용자를 잠시 기다릴 수 있도록 한다.

const PknuBuildingNumbers = ({ map }: BuildingNumbersProps) => {
  const location = useUserLocation();
  const { openModal, closeModal } = useModals();
  if (!map) {
    return null;
  }

  const routeOverlay = (PKNU_BUILDING: PknuBuilding) => {
    const {
      buildingName,
      buildingNumber,
      latlng: [lat, lng],
    } = PKNU_BUILDING;
    const routeUrl =
      typeof location === 'string'
        ? ''
        : `https://map.kakao.com/link/from/내위치,${location.latitude},${location.longitude}/to/${buildingName},${lat},${lng}`;
    const overlay = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(lat, lng),
      removable: false,
      yAnchor: 1,
    });

    const content = document.createElement('div') as HTMLDivElement;
    const routeText = document.createElement('span') as HTMLSpanElement;
    const closeButton = document.createElement('button') as HTMLButtonElement;

    routeText.appendChild(document.createTextNode('길찾기'));
    routeText.onclick = () => {
      openModal(ConfirmModal, {
        message: `목적지(${buildingNumber})로 길찾기를 시작할까요?`,
        onConfirmButtonClick: () => window.open(routeUrl, '_blank'),
        onCancelButtonClick: () => closeModal(ConfirmModal),
      });
    };
    closeButton.append(document.createTextNode('X'));
    closeButton.onclick = () => overlay.setMap(null);
    content.appendChild(routeText);
    content.appendChild(closeButton);

    overlay.setContent(content);
    overlay.setMap(map);
  };

  return (
    <>
      {PKNU_BUILDINGS.forEach((PKNU_BUILDING) => {
        const content = document.createElement('span') as HTMLSpanElement;
        const buildingNumber = document.createTextNode(
          PKNU_BUILDING.buildingNumber,
        );
        content.appendChild(buildingNumber);
        content.onclick = () => routeOverlay(PKNU_BUILDING);

        const buildingNumberOverlay = new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(
            PKNU_BUILDING.latlng[0],
            PKNU_BUILDING.latlng[1],
          ),
          content: content,
          removable: false,
          yAnchor: -0.05,
        });
        buildingNumberOverlay.setMap(map);
      })}
    </>
  );
};

export default PknuBuildingNumbers;

interface PknuBuilding {
  readonly buildingNumber: string;
  readonly buildingName: string;
  readonly latlng: [number, number];
}
