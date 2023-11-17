import Button from '@components/Common/Button';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import SkeletomItem from '@styles/Skeleton/SkeletonItem';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface DepartmentListSkeletonProps {
  length: number;
}

const DepartmentListSkeleton = ({ length }: DepartmentListSkeletonProps) => {
  return (
    <>
      <div
        css={css`
          height: 60vh;
        `}
      >
        {Array.from({ length }, (_, idx) => (
          <ListWrapper key={idx}>
            <Department></Department>
            <Icon></Icon>
          </ListWrapper>
        ))}
      </div>
      <ButtonContainer>
        <Button disabled={true}>선택완료</Button>
      </ButtonContainer>
    </>
  );
};

export default DepartmentListSkeleton;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8% 4% 8% 4%;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid ${THEME.BUTTON.GRAY};
`;

const Department = styled(SkeletomItem)`
  height: 28px;
  width: 60%;
`;

const Icon = styled(SkeletomItem)`
  height: 28px;
  width: 28px;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 4%;
  z-index: 3;
  width: 80%;
  max-width: 480px;
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
