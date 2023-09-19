import Icon from '@components/Icon';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModals, { modals } from '@hooks/useModals';
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
      return openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.NO_SEARCH_KEYWORD,
        buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
        onClose: () => closeModal(modals.alert),
      });
    }
    const searchResult = searchBuildingInfo(inputRef.current?.value);
    if (searchResult === -1) {
      return openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.SEARCH_FAILED,
        buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
        onClose: () => closeModal(modals.alert),
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
        <StyledButton onClick={() => searchHandler}>
          <Icon kind="search" size="24" color={THEME.TEXT.WHITE} />
          <StyledText>Search</StyledText>
        </StyledButton>
      </StyledForm>
    </HeaderContainer>
  );
};

export default memo(MapHeader);

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 10px;
  z-index: 3;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledInput = styled.input`
  -webkit-appearance: none;
  appearance: none;

  width: 75%;
  padding: 10px;
  border: 0;
  border-radius: 5px;
  background-color: ${THEME.TEXT.WHITE};
  font-size: 14px;
  text-indent: 5px;

  &::placeholder {
    color: ${THEME.TEXT.GRAY};
    font-size: 14px;
    font-weight: bold;
  }
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  &:focus {
    outline: none;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  }
`;

const StyledButton = styled.button`
  background-color: ${THEME.PRIMARY};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 42px;
  width: 42px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

const StyledText = styled.span`
  font-size: 10px;
  color: ${THEME.TEXT.WHITE};
`;
