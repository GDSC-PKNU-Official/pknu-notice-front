import http from '@apis/http';
import Button from '@components/Button';
import Icon from '@components/Icon';
import AlertModal from '@components/Modal/AlertModal';
import ConfirmModal from '@components/Modal/ConfirmModal';
import { MODAL_MESSAGE } from '@constants/modal-messages';
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
      {departmentList.map((department) => (
        <ListWrapper key={department} onClick={onClick}>
          {department}
          <IconWrapper>
            <Icon
              kind={selected === department ? 'checkedRadio' : 'uncheckedRadio'}
              color={selected === department ? THEME.PRIMARY : THEME.TEXT.GRAY}
            />
          </IconWrapper>
        </ListWrapper>
      ))}
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
  bottom: 100px;
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
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const ListWrapper = styled.div`
  padding: 3% 3% 3% 1%;
`;

const IconWrapper = styled.div`
  float: right;
`;

export default DepartmentList;
