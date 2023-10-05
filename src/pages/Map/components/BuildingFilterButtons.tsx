import Icon from '@components/Icon';
import { PKNU_BUILDINGS, PKNU_MAP_CENTER } from '@constants/pknu-map';
import styled from '@emotion/styled';
import useOverlays from '@hooks/useOverlays';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType, Location } from '@type/map';
import React, { CSSProperties, memo, useEffect, useState } from 'react';

import isUserInSchool from '../handlers/distance';

interface BuildingFilterButtonsProps {
  map: any;
  userLocation: Location | null;
}

const BuildingFilterButtons = ({
  map,
  userLocation,
}: BuildingFilterButtonsProps) => {
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

  const handleMapCenter = (location: Location) => {
    if (!location) return;
    const centerLocation = new window.kakao.maps.LatLng(
      location.LAT,
      location.LNG,
    );
    map.setLevel(4);
    map.panTo(centerLocation);
  };

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
    <Containter>
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
      <IconContainer>
        {isUserInSchool(userLocation.LAT, userLocation.LNG) ? (
          <Icon
            kind="locationOn"
            color={THEME.PRIMARY}
            size="32"
            onClick={() => handleMapCenter(userLocation)}
          />
        ) : (
          <Icon kind="locationOff" color={THEME.PRIMARY} size="32" />
        )}
        <Icon
          kind="reset"
          color={THEME.PRIMARY}
          size="32"
          onClick={() => handleMapCenter(PKNU_MAP_CENTER)}
        />
      </IconContainer>
    </Containter>
  );
};

export default memo(BuildingFilterButtons);

const Containter = styled.section`
  height: 0;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: -50px;
  z-index: 999;
`;

interface FilterButtonProps {
  isActive: boolean;
  activeColor: CSSProperties['color'];
}

const FilterButton = styled.button<FilterButtonProps>`
  background-color: ${({ activeColor }) => activeColor};
  color: ${({ isActive }) => (isActive ? THEME.TEXT.WHITE : THEME.TEXT.BLACK)};
  font-weight: bold;
  text-shadow: ${({ isActive }) =>
    isActive && '0px 2px 4px rgba(0, 0, 0, 0.5)'};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  transition: text-shadow 0.2s ease-in-out;

  padding: 10px;
  margin-left: 5px;
  border-radius: 30px;

  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb,
      inset 0.3rem 0.4rem 0.8rem #bec5d0;
  }

  span {
    display: inline-block;
    position: relative;
    transform: translateY(${({ isActive }) => (isActive ? '0' : '2px')});
    transition: transform 0.2s ease-in-out;
  }
`;

const IconContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: flex-end;

  position: absolute;
  top: -50px;
  z-index: 999;
  right: 5px;
`;
