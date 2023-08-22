import Icon from '@components/Icon';
import AlertModal from '@components/Modal/AlertModal';
import ConfirmModal from '@components/Modal/ConfirmModal';
import {
  NO_PROVIDE_LOCATION,
  PKNU_BUILDINGS,
  PKNU_MAP_CENTER,
} from '@constants/pknu-map';
import styled from '@emotion/styled';
import useModals from '@hooks/useModals';
import useUserLocation from '@hooks/useUserLocation';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType, Location, PKNUBuilding } from '@type/map';
import React, { memo, useRef, useState } from 'react';

import distanceHandler from '../handlers/distance-handler';
import NumberOverlay from '../handlers/overlay-handler';

interface BuildingInfo extends PKNUBuilding {
  buildingType: string;
  buildingIndex: number;
}

interface MapHeaderProps {
  map: any;
}

const MapHeader = ({ map }: MapHeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [buildingInfo, setBuildingInfo] = useState<BuildingInfo | null>(null);
  const { openModal, closeModal } = useModals();
  const userLocation: Location | null = useUserLocation();

  const setCenterHandler = (location: Location | null) => {
    map.setCenter(
      location && new window.kakao.maps.LatLng(location.LAT, location.LNG),
    );
    map.setLevel(4);
  };
  const zoomInHandler = () => {
    map.setLevel(2);
    map.setCenter(
      buildingInfo &&
        new window.kakao.maps.LatLng(
          buildingInfo.latlng[0],
          buildingInfo.latlng[1],
        ),
    );
    if (
      document.querySelector(
        `.${buildingInfo?.buildingType}-${buildingInfo?.buildingIndex}`,
      ) ||
      !buildingInfo
    ) {
      return;
    }
    const buildingNumberOverlay = new NumberOverlay(
      buildingInfo,
      openModal,
      closeModal,
      userLocation,
    ).createOverlay(
      buildingInfo.buildingType as BuildingType,
      buildingInfo.buildingIndex,
    );

    buildingNumberOverlay.setMap(map);
  };

  const getRouteUrl = (): string | undefined => {
    if (!userLocation || !buildingInfo) return '';
    return `https://map.kakao.com/link/from/내위치,${userLocation.LAT},${userLocation.LNG}/to/${buildingInfo.buildingName},${buildingInfo.latlng[0]},${buildingInfo.latlng[1]}`;
  };
  const routeHandler = () => {
    const routeUrl = getRouteUrl();
    JSON.stringify(userLocation) !== JSON.stringify(NO_PROVIDE_LOCATION)
      ? openModal(ConfirmModal, {
          message: `목적지(${buildingInfo?.buildingNumber})로 길찾기를 시작할까요?`,
          onConfirmButtonClick: () => {
            window.open(routeUrl, '_blank'), closeModal(ConfirmModal);
          },
          onCancelButtonClick: () => closeModal(ConfirmModal),
        })
      : openModal(AlertModal, {
          message: '위치정보를 제공하지 않아 길찾기 기능을 사용할 수 없어요!',
          buttonMessage: '닫기',
          onClose: () => closeModal(AlertModal),
        });
  };

  const searchHandler = () => {
    if (!inputRef.current || inputRef.current.value.length < 1) {
      return openModal(AlertModal, {
        message: '검색어를 입력해주세요!',
        buttonMessage: '닫기',
        onClose: () => closeModal(AlertModal),
      });
    }
    const searchResult = searchBuildingInfo(inputRef.current?.value);
    if (searchResult === -1) {
      return openModal(AlertModal, {
        message: '찾으시는 건물이 존재하지 않아요! 검색어를 다시 확인해주세요.',
        buttonMessage: '닫기',
        onClose: () => closeModal(AlertModal),
      });
    }
    const [buildingType, index] = searchResult;
    setBuildingInfo({
      ...PKNU_BUILDINGS[buildingType].buildings[index],
      buildingType,
      buildingIndex: index,
    });
    inputRef.current.value = '';
  };
  const searchBuildingInfo = (keyword: string): [BuildingType, number] | -1 => {
    keyword = keyword.split(' ').join('').toUpperCase();
    for (const buildingType of Object.keys(PKNU_BUILDINGS)) {
      const index = PKNU_BUILDINGS[
        buildingType as BuildingType
      ].buildings.findIndex(
        (PKNU_BUILDING) =>
          PKNU_BUILDING.buildingName === keyword ||
          PKNU_BUILDING.buildingNumber === keyword,
      );
      if (index !== -1) return [buildingType as BuildingType, index];
    }
    return -1;
  };

  return (
    <HeaderContainer>
      <SearchContainer>
        <InputContainer>
          <StyledInput
            ref={inputRef}
            type="text"
            placeholder="건물번호 또는 건물이름 검색!"
          />
          <Icon kind="search" color={THEME.PRIMARY} onClick={searchHandler} />
        </InputContainer>
        {buildingInfo && (
          <BuildingInfo>
            <span>{buildingInfo.buildingName}</span>
            <span>{buildingInfo.buildingNumber}</span>
            <span onClick={zoomInHandler}>확대</span>
            <span onClick={routeHandler}>길찾기</span>
          </BuildingInfo>
        )}
      </SearchContainer>
      <IconContainer>
        {userLocation && distanceHandler(userLocation.LAT, userLocation.LNG) ? (
          <Icon
            kind="locationOn"
            color={THEME.PRIMARY}
            size="32"
            onClick={() => setCenterHandler(userLocation)}
          />
        ) : (
          <Icon kind="locationOff" color={THEME.PRIMARY} size="32" />
        )}
        <Icon
          kind="reset"
          color={THEME.PRIMARY}
          size="32"
          onClick={() => setCenterHandler(PKNU_MAP_CENTER)}
        />
      </IconContainer>
    </HeaderContainer>
  );
};

export default memo(MapHeader);

const HeaderContainer = styled.div`
  position: relative;
  height: 8vh;
`;

const SearchContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  border: 0;
  border-bottom: 2px solid ${THEME.TEXT.GRAY};
  border-radius: 0px;

  font-size: 12px;
  width: 40%;

  &::placeholder {
    color: ${THEME.TEXT.GRAY};
    font-size: 12px;
  }

  &:focus {
    border-bottom: 2px solid ${THEME.PRIMARY};
    outline: none;
  }
`;

const BuildingInfo = styled.div`
  display: flex;
  font-size: 12px;

  & > span {
    flex: 2;
    margin: 0 10px;
    text-align: center;
    white-space: nowrap;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 5px;
  bottom: -76vh;
  z-index: 999;
`;
