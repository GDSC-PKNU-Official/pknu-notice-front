import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { useState } from 'react';

import Icon from '../Icon';

interface ToggleInfoProps {
  infoTitle: () => JSX.Element;
  infoDesc: () => JSX.Element;
}

const ToggleInfo = ({ infoTitle, infoDesc }: ToggleInfoProps) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const toggleInfo = () => setShowInfo((prevState) => !prevState);

  return (
    <>
      <ToggleContainer showInfo={showInfo} onClick={toggleInfo}>
        {infoTitle()}
        <IconContainer>
          <Icon kind="arrowDown" size="24" />
        </IconContainer>
      </ToggleContainer>
      {showInfo && infoDesc()}
    </>
  );
};

export default ToggleInfo;

const ToggleContainer = styled.section<{ showInfo: boolean }>`
  position: relative;
  padding: 10px 0px 10px 0px;
  display: flex;
  align-items: center;

  ${({ showInfo }) => css`
    & > span {
      color: ${showInfo && THEME.PRIMARY};
    }
    & > div > svg {
      transform: ${showInfo ? 'rotate(-180deg)' : 'rotate(0deg)'};
      transition: all ease 0.3s;
    }
  `}
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
`;
