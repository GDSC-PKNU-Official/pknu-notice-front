import { css } from '@emotion/react';
import styled from '@emotion/styled';
import SkeletomItem from '@styles/SkeletonItem';

interface AnnounceCardSkeletonProps {
  length: number;
}

const AnnounceCardSkeleton = ({ length }: AnnounceCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length }, (_, idx) => (
        <div key={idx}>
          <Wrapper>
            <Title></Title>
            <div
              css={css`
                border-left: 1px solid gray;
                height: 12px;
                margin: 0 10px;
              `}
            />
            <Date></Date>
          </Wrapper>
        </div>
      ))}
    </>
  );
};

export default AnnounceCardSkeleton;

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;

const Title = styled(SkeletomItem)`
  flex: 9;
  width: 100%;
  height: 30px;
`;

const Date = styled(SkeletomItem)`
  flex: 1;
  width: 100%;
  height: 20px;
`;
