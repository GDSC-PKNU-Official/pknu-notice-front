import http from '@apis/http';
import Button from '@components/Button';
import Icon from '@components/Icon';
import AlertModal from '@components/Modal/AlertModal';
import ConfirmModal from '@components/Modal/ConfirmModal';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useModals from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DepartmentList = () => {
  const [departmentList, setDepartmentList] = useState<string[]>();
  const [selected, setSelected] = useState<string>('');
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const { routerTo, goBack } = useRouter();
  const { setMajor } = useMajor();
  const { college } = useParams();
  const { openModal, closeModal } = useModals();

  const fetchData = async () => {
    const result = await http.get(`/api/majorDecision/${college}`);
    if (result.data === undefined) {
      goBack();
    }
    setDepartmentList(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const routerToHome = () => {
    closeModal(AlertModal);
    routerTo('/');
  };

  const handlerMajorSetModal = () => {
    closeModal(ConfirmModal);
    const afterSpace = selected.substring(selected.indexOf(' ') + 1);
    localStorage.setItem('major', afterSpace);
    setMajor(afterSpace);

    openModal(AlertModal, {
      message: MODAL_MESSAGE.SUCCEED.SET_MAJOR,
      buttonMessage: '홈으로 이동하기',
      onClose: () => routerToHome(),
      routerTo: () => routerToHome(),
    });
  };

  const handleMajorConfirmModal = () => {
    openModal(ConfirmModal, {
      message: MODAL_MESSAGE.CONFIRM.SET_MAJOR,
      onConfirmButtonClick: () => handlerMajorSetModal(),
      onCancelButtonClick: () => closeModal(ConfirmModal),
    });
  };

  const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.currentTarget.textContent === null) return;
    setSelected(e.currentTarget.textContent);
    setButtonDisable(false);
  };

  return departmentList ? (
    <ListContainer>
      <Title>학과 선택하기</Title>
      <div
        css={css`
          height: 60vh;
        `}
      >
        {departmentList.map((department) => (
          <div
            key={department}
            css={css`
              width: 100%;
            `}
            onClick={onClick}
          >
            <ListWrapper>
              {department}
              <Icon
                kind={
                  selected === department ? 'checkedRadio' : 'uncheckedRadio'
                }
                color={
                  selected === department ? THEME.PRIMARY : THEME.TEXT.GRAY
                }
                size="24"
              />
            </ListWrapper>
          </div>
        ))}
      </div>
      <ButtonContainer>
        <Button disabled={buttonDisable} onClick={handleMajorConfirmModal}>
          선택완료
        </Button>
      </ButtonContainer>
    </ListContainer>
  ) : (
    <div>loading..</div>
  );
};

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

const ListContainer = styled.div`
  padding-top: 2%;
  padding-left: 2%;
  padding-bottom: 15%;
  overflow: auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 3%;
  padding-left: 5%;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid ${THEME.BUTTON.GRAY};
  padding: 8% 6% 8% 6%;
`;

export default DepartmentList;
