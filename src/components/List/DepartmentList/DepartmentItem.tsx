import http from '@apis/http';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { SERVER_URL } from '@config/index';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useModals, { modals } from '@hooks/useModals';
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
  const { openModal, closeModal } = useModals();
  const [selected, setSelected] = useState<string>('');
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  const routerToHome = () => {
    closeModal(modals.alert);
    routerTo('/');
  };
  const handleMajorClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.currentTarget.textContent === null) return;
    setSelected(e.currentTarget.textContent);
    setButtonDisable(false);
  };

  const handlerMajorSetModal = () => {
    closeModal(modals.confirm);

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

    openModal<typeof modals.alert>(modals.alert, {
      message: MODAL_MESSAGE.SUCCEED.SET_MAJOR,
      buttonMessage: MODAL_BUTTON_MESSAGE.GO_HOME,
      onClose: () => routerToHome(),
      routerTo: () => routerToHome(),
    });
  };
  const handleMajorConfirmModal = () => {
    openModal<typeof modals.confirm>(modals.confirm, {
      message: MODAL_MESSAGE.CONFIRM.SET_MAJOR,
      onConfirmButtonClick: () => handlerMajorSetModal(),
      onCancelButtonClick: () => closeModal(modals.confirm),
    });
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
        <Button disabled={buttonDisable} onClick={handleMajorConfirmModal}>
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
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 4%;
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
