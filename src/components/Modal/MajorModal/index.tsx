import Button from '@components/Button';
import Icon from '@components/Icon';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';

import Modal from '..';

interface MajorModalProps {
  onClose: () => void;
  routerTo: () => void;
}

const MajorModal = ({ onClose, routerTo }: MajorModalProps) => {
  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <span
          css={css`
            color: ${THEME.TEXT.GRAY};
            font-weight: bold;
            margin-bottom: 15px;
          `}
        >
          아직 학과를 알려주지 않았어요
        </span>
        <Button onClick={routerTo}>
          <Icon kind="plus" color={THEME.TEXT.WHITE} />
          <span>학과 선택하기</span>
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default MajorModal;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${THEME.TEXT.WHITE};
  padding: 30px;
  border-radius: 15px;

  Button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    flex: 0 0 15%;
    width: 15;
  }
`;
