import Icon from '@components/Icon';
import AlertModal from '@components/Modal/AlertModal';
import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModals from '@hooks/useModals';
import useUserLocation from '@hooks/useUserLocation';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType, Location, PKNUBuilding } from '@type/map';
import React, { memo, useRef } from 'react';

import NumberOverlay from '../handlers/overlay-handler';

interface MapHeaderProps {
  map: any;
}

const MapHeader = ({ map }: MapHeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { openModal, closeModal } = useModals();
  const userLocation: Location | null = useUserLocation();

  const zoomInHandler = (
    buildingInfo: PKNUBuilding,
    buildingType: BuildingType,
    buildingIndex: number,
  ) => {
    map.setLevel(2);
    map.setCenter(
      buildingInfo &&
        new window.kakao.maps.LatLng(
          buildingInfo.latlng[0],
          buildingInfo.latlng[1],
        ),
    );
    if (
      document.querySelector(`.${buildingType}-${buildingIndex}`) ||
      !buildingInfo
    ) {
      return;
    }
    const buildingNumberOverlay = new NumberOverlay(
      buildingInfo,
      openModal,
      closeModal,
      userLocation,
    ).createOverlay(buildingType as BuildingType);

    buildingNumberOverlay.setMap(map);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    zoomInHandler(
      PKNU_BUILDINGS[buildingType].buildings[index],
      buildingType,
      index,
    );
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
      <StyledForm onSubmit={searchHandler}>
        <StyledInput
          ref={inputRef}
          type="text"
          placeholder="건물번호 또는 건물이름을 검색해주세요"
        />
        <button
          css={css`
            background-color: transparent;
          `}
          onClick={() => searchHandler}
        >
          <Icon kind="search" color={THEME.PRIMARY} />
        </button>
      </StyledForm>
    </HeaderContainer>
  );
};

export default memo(MapHeader);

const HeaderContainer = styled.div`
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  border: 0;
  border-bottom: 2px solid ${THEME.TEXT.GRAY};
  background-color: transparent;
  border-radius: 0px;

  font-size: 14px;
  width: 60%;

  &::placeholder {
    color: ${THEME.TEXT.GRAY};
    font-size: 14px;
  }

  &:focus {
    border-bottom: 2px solid ${THEME.PRIMARY};
    outline: none;
  }
`;
