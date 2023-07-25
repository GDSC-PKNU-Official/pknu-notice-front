import Button from '@components/Button';
import Icon from '@components/Icon';
import { css } from '@emotion/react';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';
import React from 'react';

import Modal from '..';

interface AlertModalProps {
  message: string;
  buttonMessage: string;
  open: boolean;
  iconKind?: IconKind;
  onClose: () => void;
  routerTo?: () => void;
}

const AlertModal = ({
  message,
  buttonMessage,
  open,
  iconKind,
  onClose,
  routerTo = onClose,
}: AlertModalProps) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose}>
          <>
            <span
              css={css`
                color: ${THEME.TEXT.GRAY};
                font-weight: bold;
                margin: 0 auto;
                margin-bottom: 15px;
              `}
            >
              {message}
            </span>
            <Button onClick={routerTo}>
              {iconKind && <Icon kind={iconKind} color={THEME.TEXT.WHITE} />}
              {buttonMessage}
            </Button>
          </>
        </Modal>
      )}
    </>
  );
};

export default AlertModal;
