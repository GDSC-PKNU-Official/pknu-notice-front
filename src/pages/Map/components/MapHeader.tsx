import Icon from '@components/Icon';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { PKNU_BUILDINGS } from '@constants/pknu-map';
import PLCACEHOLDER_MESSAGES from '@constants/placeholder-message';
import styled from '@emotion/styled';
import useModals, { modals } from '@hooks/useModals';
import useOverlays from '@hooks/useOverlays';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType, PKNUBuilding } from '@type/map';
import React, { useRef } from 'react';

interface MapHeaderProps {
  map: any;
}

const MapHeader = ({ map }: MapHeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { openModal, closeModal } = useModals();
  const { addOverlay } = useOverlays();

  const handleZoomIn = (buildingType: BuildingType, building: PKNUBuilding) => {
    addOverlay(buildingType, building, map);
    map.setLevel(2);
    map.panTo(
      building &&
        new window.kakao.maps.LatLng(building.latlng[0], building.latlng[1]),
    );
  };

  const getBuildingInfo = (
    keyword: string,
  ): [BuildingType, number] | undefined => {
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
    return;
  };
  const handleBuildingSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || inputRef.current.value.length < 1) {
      return openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.NO_SEARCH_KEYWORD,
        buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
        onClose: () => closeModal(modals.alert),
      });
    }
    const searchResult = getBuildingInfo(inputRef.current?.value);
    if (!searchResult) {
      return openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.SEARCH_FAILED,
        buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
        onClose: () => closeModal(modals.alert),
      });
    }
    const [buildingType, index] = searchResult;
    inputRef.current.value = '';
    handleZoomIn(buildingType, PKNU_BUILDINGS[buildingType].buildings[index]);
  };

  return (
    <HeaderContainer>
      <StyledForm onSubmit={handleBuildingSearch}>
        <StyledInput
          ref={inputRef}
          type="text"
          placeholder={PLCACEHOLDER_MESSAGES.SEARCH_BUILDING}
        />
        <StyledButton onClick={() => handleBuildingSearch}>
          <Icon kind="search" size="24" color={THEME.TEXT.WHITE} />
          <StyledText>Search</StyledText>
        </StyledButton>
      </StyledForm>
    </HeaderContainer>
  );
};

export default MapHeader;

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
