import Button from '@components/Button';
import { css } from '@emotion/react';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

import Modal from '..';

interface ConfirmModalProps {
  message: string;
  open: boolean;
  onConfirmButtonClick: () => void;
  onCancelButtonClick: () => void;
}

const ConfirmModal = ({
  message,
  open,
  onConfirmButtonClick,
  onCancelButtonClick,
}: ConfirmModalProps) => {
  return (
    <>
      {open && (
        <Modal onClose={onCancelButtonClick}>
          <>
            <span
              css={css`
                color: ${THEME.TEXT.GRAY};
                font-weight: bold;
                margin: 0 auto;
                margin-bottom: 15px;
                white-space: pre-line;
              `}
            >
              {message}
            </span>
            <div
              css={css`
                display: flex;
                gap: 3.6rem;
                justify-content: center;
              `}
            >
              <Button onClick={onCancelButtonClick}>아니오</Button>
              <Button onClick={onConfirmButtonClick}>네!</Button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
