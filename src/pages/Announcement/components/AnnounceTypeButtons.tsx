import Button from '@components/Button';
import { css } from '@emotion/react';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface AnnounceTypeButtonsProps {
  type: '일반' | '고정';
  isActive: boolean;
  onClick: () => void;
}

const AnnounceTypeButtons = ({
  type,
  isActive,
  onClick,
}: AnnounceTypeButtonsProps) => {
  return (
    <Button
      css={css`
        margin: 0px;
        height: 2rem;
        width: 4rem;
        border-radius: 4rem;
        font-weight: normal;
        background-color: ${isActive ? THEME.BUTTON.BLUE : THEME.BUTTON.GRAY};
        color: ${isActive ? THEME.TEXT.WHITE : THEME.TEXT.GRAY};
      `}
      onClick={onClick}
    >
      {type}
    </Button>
  );
};

export default AnnounceTypeButtons;
