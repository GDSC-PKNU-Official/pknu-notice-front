import http from '@apis/http';
import Icon from '@components/Icon';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { useState, useEffect } from 'react';

const CollegeList = () => {
  const [collegeList, setCollegeList] = useState<string[]>();
  const { routerTo } = useRouter();

  const fetchData = async () => {
    const result = await http.get('/majorDecision');
    setCollegeList(result.data);
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      const COLLEGENAME = e.currentTarget.textContent;
      routerTo(`/major-decision/${COLLEGENAME}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return collegeList ? (
    <CollegeContainer>
      {collegeList.map((college) => (
        <CollegeWrapper key={college} onClick={onClick}>
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
