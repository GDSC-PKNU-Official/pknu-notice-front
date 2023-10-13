import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useOverlays from '@hooks/useOverlays';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType, Location } from '@type/map';
import React, { CSSProperties, useEffect, useState } from 'react';

interface FilterButtonsProps {
  map: any;
  userLocation: Location | null;
}

const FilterButtons = ({ map, userLocation }: FilterButtonsProps) => {
  if (!map || !userLocation) return <></>;
  const [activeTypes, setActiveTypes] = useState<Record<BuildingType, boolean>>(
    {
      A: true,
      B: false,
      C: false,
      D: false,
      E: false,
    },
  );
  const { handleOverlays } = useOverlays();

  const handleBuildingTypes = (type: BuildingType) => {
    setActiveTypes((prevActiveTypes) => {
      return {
        ...prevActiveTypes,
        [type]: !prevActiveTypes[type],
      };
    });
  };

  const handleButtonClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target instanceof HTMLSpanElement) {
      handleBuildingTypes(e.target.innerText as BuildingType);
    } else if (
      e.target instanceof HTMLButtonElement &&
      typeof e.target.textContent === 'string'
    ) {
      handleBuildingTypes(e.target.textContent as BuildingType);
    }
  };

  useEffect(() => {
    handleOverlays(activeTypes, map);
  }, [activeTypes]);

  return (
    <ButtonContainer onClick={handleButtonClick}>
      {Object.keys(activeTypes).map((type) => (
        <FilterButton
          key={type}
          isActive={activeTypes[type as BuildingType]}
          activeColor={PKNU_BUILDINGS[type as BuildingType].activeColor}
        >
          <span>{type}</span>
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
  transition: text-shadow 0.2s ease-in-out;
  span {
    display: inline-block;
    position: relative;
    transform: translateY(${({ isActive }) => (isActive ? '0' : '1px')});
    transition: transform 0.2s ease-in-out;
  }
`;
