import fetchMajorList from '@apis/Suspense/fetch-major-list';
import DEPARTMENT_LENGTH from '@constants/department-length';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import DepartmentItem from './DepartmentItem';
import DepartmentSkeleton from './Skeleton';

const DepartmentList = () => {
  const { college } = useParams();
  return (
    <ListContainer>
      <Title>학과 선택하기</Title>
      <Suspense
        fallback={
          <DepartmentSkeleton length={DEPARTMENT_LENGTH[college as string]} />
        }
      >
        <DepartmentItem resource={fetchMajorList<string[]>(college)} />
      </Suspense>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  padding-top: 2%;
  padding-left: 2%;
  padding-bottom: 15%;
  overflow: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
  color: ${THEME.TEXT.GRAY};
  font-weight: bold;
`;

export default DepartmentList;
