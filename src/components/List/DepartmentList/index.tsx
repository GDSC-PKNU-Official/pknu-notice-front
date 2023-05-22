import http from '@apis/http';
import Button from '@components/Button';
import List from '@components/List';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DepartmentListProps {
  college: string;
}

const DepartmentList = (props: DepartmentListProps) => {
  const [departmentList, setDepartmentList] = useState<string[]>();
  const [department, setDepartment] = useState<string>('');
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const router = useNavigate();
  const { setMajor } = useMajor();

  const fetchData = async (collegeName: string) => {
    const result = await http.get(`majorDecision/${collegeName}`);
    if (result.data === undefined) {
      router(-1);
    }
    setDepartmentList(result.data);
  };

  const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.currentTarget.textContent === null) return;
    setDepartment(e.currentTarget.textContent);
    setButtonDisable(false);
  };

  const buttonClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    console.log(department);
    localStorage.setItem('major', department);
    setMajor('컴퓨터공학과');
    alert('전공 선택 완료 !');
    router('/');
  };

  useEffect(() => {
    fetchData(props.college);
  }, []);

  return departmentList ? (
    <Container>
      <List
        title="학부/학과 선택하기"
        icon="uncheckedRadio"
        altIcon="checkedRadio"
        contents={departmentList}
        onClick={onClick}
      />
      <ButtonContainer>
        <Button disabled={buttonDisable} onClick={buttonClick}>
          선택완료
        </Button>
      </ButtonContainer>
    </Container>
  ) : (
    <div>loading..</div>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 98%;
  margin: 0 1% 1% 1%;
  bottom: 0;
`;

export default DepartmentList;
