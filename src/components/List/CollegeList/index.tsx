import http from '@apis/http';
import Icon from '@components/Icon';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import React, { useState, useEffect } from 'react';

const CollegeList = () => {
  const [collegeList, setCollegeList] = useState<string[]>();
  const { routerTo } = useRouter();

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

  useEffect(() => {
    fetchData();
  }, []);

  return collegeList ? (
    <CollegeContainer>
      {collegeList.map((college) => (
        <CollegeWrapper
          key={college}
          onClick={onClick}
          data-testid="collegeList"
        >
          {college}
          <IconWrapper>
            <Icon kind="right" />
          </IconWrapper>
        </CollegeWrapper>
      ))}
    </CollegeContainer>
  ) : (
    <div>loading..</div>
  );
};

export default CollegeList;

const CollegeContainer = styled.div``;

const CollegeWrapper = styled.div`
  padding: 3%;
`;

const IconWrapper = styled.div`
  float: right;
`;
