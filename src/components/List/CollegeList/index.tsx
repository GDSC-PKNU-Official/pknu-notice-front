import fetchMajorList from '@apis/Suspense/fetch-major-list';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { Suspense } from 'react';

import CollegeItem from './CollegeItem';
import CollegeSkeleton from './Skeleton';

const CollegeList = () => {
  return (
    <ListContainer>
      <Title>단과대 선택하기</Title>
      <Suspense fallback={<CollegeSkeleton length={10} />}>
        <CollegeItem resource={fetchMajorList<string[]>()} />
      </Suspense>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  padding-top: 2%;
  padding-left: 2%;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
  color: ${THEME.TEXT.GRAY};
  font-weight: bold;
`;

export default CollegeList;
