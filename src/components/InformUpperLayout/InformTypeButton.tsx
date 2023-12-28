import Button from '@components/Common/Button';
import { css } from '@emotion/react';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface InformTypeButtonProps {
  type: string;
  isActive: boolean;
  onClick: () => void;
}

const InformTypeButton = ({
  type,
  isActive,
  onClick,
}: InformTypeButtonProps) => {
  return (
    <Button
      css={css`
        height: 2rem;
        width: 4rem;
        border-radius: 4rem;
        font-size: 0.7rem;
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

export default InformTypeButton;
