import http from '@apis/http';
import Icon from '@components/Icon';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import React, { useState, useEffect } from 'react';

const CollegeList = () => {
  const [collegeList, setCollegeList] = useState<string[]>();
  const { routerTo } = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await http.get('/api/majorDecision');
    setCollegeList(result.data);
  };

  const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.target !== e.currentTarget) return;

    const collegeName = e.currentTarget.textContent;

    if (collegeName === null) routerTo('/major-decision');
    else routerTo(`/major-decision/${collegeName}`);
  };

  return collegeList ? (
    <ListContainer>
      <Title>단과대 선택하기</Title>
      {collegeList.map((college) => (
        <ListWrapper key={college} onClick={onClick}>
          {college}
          <IconWrapper>
            <Icon kind="right" />
          </IconWrapper>
        </ListWrapper>
      ))}
    </ListContainer>
  ) : (
    <div>loading...</div>
  );
};

const ListContainer = styled.div`
  padding-top: 2%;
  padding-left: 2%;
`;

const ListWrapper = styled.div`
  padding: 3% 3% 3% 1%;
`;

const IconWrapper = styled.div`
  float: right;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

export default CollegeList;
