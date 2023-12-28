import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useBuildingTypes from '@hooks/useBuildingTypes';
import useMap from '@hooks/useMap';
import useOverlays from '@hooks/useOverlays';
import useUserLocation from '@hooks/useUserLocation';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType } from '@type/map';
import React, { CSSProperties, useEffect } from 'react';

const FilterButtons = () => {
  const userLocation = useUserLocation();
  const { map } = useMap();
  const { activeTypes, handleBuildingTypes } = useBuildingTypes();
  const { handleOverlays } = useOverlays();

  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    handleBuildingTypes(e.target.textContent as BuildingType);
  };

  useEffect(() => {
    if (!map || !userLocation) return;

    handleOverlays(activeTypes, map);
  }, [map, userLocation, activeTypes]);

  return (
    <ButtonContainer onClick={onClick}>
      {Object.keys(activeTypes).map((type) => (
        <FilterButton
          key={type}
          isActive={activeTypes[type as BuildingType]}
          activeColor={PKNU_BUILDINGS[type as BuildingType].activeColor}
        >
          {type}
        </FilterButton>
      ))}
    </ButtonContainer>
  );
};

export default FilterButtons;

const ButtonContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 4rem;
  z-index: 999;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

interface FilterButtonProps {
  isActive: boolean;
  activeColor: CSSProperties['color'];
}

const FilterButton = styled.button<FilterButtonProps>`
  height: 2rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${THEME.TEXT.WHITE};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 15px;
  font-weight: bold;

  ${({ isActive, activeColor }) => css`
    color: ${isActive ? activeColor : THEME.TEXT.GRAY};
    text-shadow: isActive && '0px 2px 2px rgba(0, 0, 0, 0.1)';
    border: 1px solid ${isActive ? activeColor : THEME.TEXT.GRAY};
  `}
`;
