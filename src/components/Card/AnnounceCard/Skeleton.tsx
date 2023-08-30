import { css } from '@emotion/react';
import styled from '@emotion/styled';
import SkeletomItem from '@styles/Skeleton/SkeletonItem';

interface AnnounceCardSkeletonProps {
  length: number;
}

const AnnounceCardSkeleton = ({ length }: AnnounceCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length }, (_, idx) => (
        <Card key={idx}>
          <ContentContainer>
            <AnnounceTitle></AnnounceTitle>
            <div
              css={css`
                border-left: 1px solid gray;
                height: 12px;
                margin: 0 5px;
              `}
            />
            <AnnounceDate></AnnounceDate>
          </ContentContainer>
        </Card>
      ))}
    </>
  );
};

export default AnnounceCardSkeleton;

const Card = styled.div`
  height: 28px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AnnounceTitle = styled(SkeletomItem)`
  flex: 9;
`;

const AnnounceDate = styled(SkeletomItem)`
  flex: 1;
  height: 10px;
  justify-content: flex-end;
`;
