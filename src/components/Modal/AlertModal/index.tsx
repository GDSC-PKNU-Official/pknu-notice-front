import Button from '@components/Button';
import Icon from '@components/Icon';
import { css } from '@emotion/react';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';
import React from 'react';

import Modal from '..';

interface AlertModalProps {
  message: string;
  buttonMessage?: string;
  open: boolean;
  iconKind?: IconKind;
  onClose?: () => void;
  routerTo?: () => void;
}

const AlertModal = ({
  message,
  buttonMessage,
  open,
  iconKind,
  onClose = () => undefined,
  routerTo = onClose,
}: AlertModalProps) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose}>
          <>
            <span
              css={css`
                white-space: pre-line;
                color: ${THEME.TEXT.GRAY};
                font-weight: bold;
                margin: 0 auto;
              `}
            >
              {message}
            </span>
            {buttonMessage && (
              <Button
                onClick={routerTo}
                css={css`
                  margin-top: 15px;
                `}
              >
                {iconKind && <Icon kind={iconKind} color={THEME.TEXT.WHITE} />}
                {buttonMessage}
              </Button>
            )}
          </>
        </Modal>
      )}
    </>
  );
};

export default AlertModal;
