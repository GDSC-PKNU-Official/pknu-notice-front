import styled from '@emotion/styled';
import SkeletomItem from '@styles/Skeleton/SkeletonItem';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface CollegeSkeletonProps {
  length: number;
}

const CollegeSkeleton = ({ length }: CollegeSkeletonProps) => {
  return (
    <>
      {Array.from({ length }, (_, idx) => (
        <ListWrapper key={idx}>
          <College></College>
          <Icon></Icon>
        </ListWrapper>
      ))}
    </>
  );
};

export default CollegeSkeleton;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8% 6% 8% 6%;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid ${THEME.BUTTON.GRAY};
`;

const College = styled(SkeletomItem)`
  height: 28px;
  width: 60%;
`;

const Icon = styled(SkeletomItem)`
  height: 28px;
  width: 28px;
`;
