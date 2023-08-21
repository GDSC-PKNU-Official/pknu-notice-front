import { PKNU_BUILDINGS } from '@constants/pknu-map';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { BuildingType } from '@type/map';
import React, { CSSProperties, SetStateAction, useState } from 'react';

interface BuildingFilterButtonsProps {
  buildingTypes: BuildingType[];
  setBuildingTypes: React.Dispatch<SetStateAction<BuildingType[]>>;
}

const BuildingFilterButtons = ({
  buildingTypes,
  setBuildingTypes,
}: BuildingFilterButtonsProps) => {
  const [activeButtons, setActiveButtons] = useState<
    Record<BuildingType, boolean>
  >({
    A: true,
    B: false,
    C: false,
    D: false,
    E: false,
  });

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
    <div
      onClick={buttonClickHandler}
      css={css`
        flex: 5;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      `}
    >
      {Object.keys(activeButtons).map((type) => (
        <FilterButton
          key={type}
          isActive={activeButtons[type as BuildingType]}
          activeColor={PKNU_BUILDINGS[type as BuildingType].activeColor}
        >
          <span>{type}</span>
        </FilterButton>
      ))}
    </div>
  );
};

export default BuildingFilterButtons;

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
