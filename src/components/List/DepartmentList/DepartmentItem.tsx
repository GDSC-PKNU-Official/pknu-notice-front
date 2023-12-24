import http from '@apis/http';
import Button from '@components/Common/Button';
import Icon from '@components/Common/Icon';
import Modal from '@components/Common/Modal';
import { SERVER_URL } from '@config/index';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useModals from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from 'react';

type Department = string[];
type Resource = AxiosResponse<Department> | Department | AxiosError | null;
interface DepartmentItemProps {
  resource: {
    read: () => Resource;
  };
}

const DepartmentItem = ({ resource }: DepartmentItemProps) => {
  const majorList = resource.read();
  if (majorList === null || majorList instanceof Error) return null;

  const { routerTo } = useRouter();
  const { major, setMajor } = useMajor();
  const { openModal } = useModals();
  const [selected, setSelected] = useState<string>('');
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  const routerToHome = () => {
    routerTo('/');
  };

  const handleMajorClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.currentTarget.textContent === null) return;
    setSelected(e.currentTarget.textContent);
    setButtonDisable(false);
  };

  const handleMajorSetting = () => {
    const storedSubscribe = localStorage.getItem('subscribe');
    if (major && storedSubscribe) {
      http.delete(`${SERVER_URL}/api/subscription/major`, {
        data: { subscription: JSON.parse(storedSubscribe), major },
      });
      localStorage.removeItem('subscribe');
    }
    const afterSpace = selected.substring(selected.indexOf(' ') + 1);
    localStorage.setItem('major', afterSpace);
    setMajor(afterSpace);

    openModal(
      <Modal>
        <Modal.ModalTitle title={MODAL_MESSAGE.SUCCEED.SET_MAJOR} />
        <Modal.ModalButton
          text={MODAL_BUTTON_MESSAGE.GO_HOME}
          onClick={routerToHome}
        />
      </Modal>,
    );
  };

  const handleMajorConfirm = () => {
    const modalTitle =
      selected.substring(selected.indexOf(' ') + 1) +
      MODAL_MESSAGE.CONFIRM.SET_MAJOR;

    openModal(
      <Modal>
        <Modal.ModalTitle title={modalTitle} />
        <Modal.ModalButton text={MODAL_BUTTON_MESSAGE.NO} />
        <Modal.ModalButton
          text={MODAL_BUTTON_MESSAGE.YES}
          onClick={handleMajorSetting}
        />
      </Modal>,
    );
  };

  return (
    <>
      <div
        css={css`
          height: 60vh;
        `}
      >
        {(majorList as Department).map((department, index) => (
          <ListWrapper key={index} onClick={handleMajorClick}>
            {department}
            <Icon
              kind={selected === department ? 'checkedRadio' : 'uncheckedRadio'}
              color={selected === department ? THEME.PRIMARY : THEME.TEXT.GRAY}
              size="28"
            />
          </ListWrapper>
        ))}
      </div>
      <ButtonContainer>
        <Button disabled={buttonDisable} onClick={handleMajorConfirm}>
          선택완료
        </Button>
      </ButtonContainer>
    </>
  );
};

export default DepartmentItem;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8% 4% 8% 4%;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid ${THEME.BUTTON.GRAY};

  transition: 0.3s;
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 8%;
  z-index: 3;
  width: 80%;
  max-width: 480px;
  left: 50%;
  transform: translate(-50%, -50%);

  Button {
    display: flex;
    align-items: center;
    padding: 10px;
    & > svg {
      margin-right: 15px;
    }
  }
`;
