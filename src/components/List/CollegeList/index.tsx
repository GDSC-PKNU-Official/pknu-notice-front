import http from '@apis/http';
import Icon from '@components/Icon';
import DepartmentList from '@components/List/DepartmentList';
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
    const result = await http.get('/majorDecision');
    setCollegeList(result.data);
  };

  const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.target !== e.currentTarget) return;

    const collegeName = e.currentTarget.textContent;
    if (collegeName === null) routerTo('/major-decision');
    else routerTo(`/major-decision?major=${collegeName}`);
  };

  if (window.location.search) {
    const college = window.location.search.split('?major=')[1];
    return <DepartmentList college={college} />;
  }

  return collegeList ? (
    <ListContainer>
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

const ListContainer = styled.div``;

const ListWrapper = styled.div`
  padding: 3%;
`;

const IconWrapper = styled.div`
  float: right;
`;

export default CollegeList;
