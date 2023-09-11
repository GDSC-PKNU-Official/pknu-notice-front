import Icon from '@components/Icon';
import { PKNU_BUILDINGS, PKNU_MAP_CENTER } from '@constants/pknu-map';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType, Location } from '@type/map';
import React, { CSSProperties, SetStateAction, memo, useState } from 'react';

import isUserInSchool from '../handlers/distance-handler';

interface BuildingFilterButtonsProps {
  map: any;
  location: Location | null;
  buildingTypes: BuildingType[];
  setBuildingTypes: React.Dispatch<SetStateAction<BuildingType[]>>;
}

const BuildingFilterButtons = ({
  map,
  location,
  buildingTypes,
  setBuildingTypes,
}: BuildingFilterButtonsProps) => {
  if (!map) return <></>;
  const [activeButtons, setActiveButtons] = useState<
    Record<BuildingType, boolean>
  >({
    A: true,
    B: false,
    C: false,
    D: false,
    E: false,
  });

  const setCenterHandler = (location: Location | null) => {
    map.setCenter(
      location && new window.kakao.maps.LatLng(location.LAT, location.LNG),
    );
    map.setLevel(4);
  };

  const buildingTypesHandler = (type: BuildingType) => {
    setActiveButtons((prevActiceButtons) => {
      return {
        ...prevActiceButtons,
        [type]: !prevActiceButtons[type],
      };
    });
    if (!buildingTypes.includes(type)) {
      setBuildingTypes((prevTypes) => [...prevTypes, type]);
      return;
    }
    setBuildingTypes((prevTypes) =>
      prevTypes.filter((prevType) => prevType !== type),
    );
  };
  const buttonClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target instanceof HTMLSpanElement) {
      buildingTypesHandler(e.target.innerText as BuildingType);
    } else if (
      e.target instanceof HTMLButtonElement &&
      typeof e.target.textContent === 'string'
    ) {
      buildingTypesHandler(e.target.textContent as BuildingType);
    }
  };

  return (
    <Containter>
      <ButtonContainer onClick={buttonClickHandler}>
        {Object.keys(activeButtons).map((type) => (
          <FilterButton
            key={type}
            isActive={activeButtons[type as BuildingType]}
            activeColor={PKNU_BUILDINGS[type as BuildingType].activeColor}
          >
            <span>{type}</span>
          </FilterButton>
        ))}
      </ButtonContainer>
      <IconContainer>
        {location && isUserInSchool(location.LAT, location.LNG) ? (
          <Icon
            kind="locationOn"
            color={THEME.PRIMARY}
            size="32"
            onClick={() => setCenterHandler(location)}
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
    </Containter>
  );
};

export default memo(BuildingFilterButtons);

interface FilterButtonProps {
  isActive: boolean;
  activeColor: CSSProperties['color'];
}

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
