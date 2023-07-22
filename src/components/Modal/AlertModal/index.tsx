import Button from '@components/Button';
import Icon from '@components/Icon';
import { css } from '@emotion/react';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';
import React from 'react';

import Modal from '..';

/*
TODO
1. 모달이 필요한 컴포넌트 내부에서 모달의 상태 관리 -> 모달이 필요한 컴포넌트는 모달상태를 관리하는 Context APIf를 통해서 모달의 상태를 내려받음.
*/

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
              {iconKind && <Icon kind="plus" color={THEME.TEXT.WHITE} />}
              {buttonMessage}
            </Button>
          </>
        </Modal>
      )}
    </>
  );
};

export default AlertModal;
