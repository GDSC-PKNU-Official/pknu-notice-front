import http from '@apis/http';
import Button from '@components/Button';
import Icon from '@components/Icon';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentList = () => {
  const [departmentList, setDepartmentList] = useState<string[]>();
  const [selected, setSelected] = useState<string>('');
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const router = useNavigate();
  const { setMajor } = useMajor();
  const { college } = useParams();

  const fetchData = async () => {
    const result = await http.get(`/api/majorDecision/${college}`);
    if (result.data === undefined) {
      router(-1);
    }
    setDepartmentList(result.data);
  };

  const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.currentTarget.textContent === null) return;
    setSelected(e.currentTarget.textContent);
    setButtonDisable(false);
  };

  const buttonClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    localStorage.setItem('major', selected);
    setMajor(selected);
    alert('전공 선택 완료 !');
    router('/');
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Button disabled={buttonDisable} onClick={buttonClick}>
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
