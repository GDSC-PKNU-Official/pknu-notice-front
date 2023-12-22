import { css } from '@emotion/react';
import useModals from '@hooks/useModals';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';
import React from 'react';

import Button from '../Button';
import Icon from '../Icon';

interface ModalButtonProps {
  text: string;
  iconKind?: IconKind & 'plus';
  onClick?: () => void;
}

const ModalButton = ({ text, iconKind, onClick }: ModalButtonProps) => {
  const { closeModal } = useModals();

  const onButtonClick = () => {
    closeModal();
    onClick && onClick();
  };

  return (
    <Button
      onClick={onButtonClick}
      css={css`
        font-size: 0.8rem;
      `}
    >
      {iconKind && <Icon kind={iconKind} color={THEME.TEXT.WHITE} />}
      {text}
    </Button>
  );
};

export default ModalButton;
