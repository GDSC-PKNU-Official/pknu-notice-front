import fetchAnnounceList from '@apis/Suspense/fetch-announce-list';
import InformUpperLayout from '@components/InformUpperLayout';
import AnnounceList from '@components/List/AnnounceList';
import AnnounceCardSkeleton from '@components/List/AnnounceList/Skeleton';
import { ANNOUNCEMENT_TYPE } from '@constants/announcement';
import PATH from '@constants/path';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import {
  AnnounceItemList,
  AnnouncementCategory,
  AnnouncementType,
} from '@type/announcement';
import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

interface AnnounceContainerProps {
  title: string;
  category: AnnouncementCategory;
  endPoint: string | null;
}

const AnnounceContainer = ({
  title,
  category,
  endPoint,
}: AnnounceContainerProps) => {
  const { type } = useParams();
  if (!type) return <></>;

  const { routerTo } = useRouter();

  const showNormalAnnouncement = () =>
    routerTo(PATH.NORMAL_ANNOUNCEMENT(category));
  const showPinnedAnnouncement = () =>
    routerTo(PATH.PINNED_ANNOUNCEMENT(category));

  const resource = useMemo(
    () => fetchAnnounceList<AnnounceItemList>(endPoint),
    [],
  );

  return (
    <Container>
      <InformUpperLayout>
        <InformUpperLayout.InformTitle title={title} />
        <InformUpperLayout.InformSearchForm category={category} />
        <InformUpperLayout.InformTypeButton
          type="일반"
          isActive={type === ANNOUNCEMENT_TYPE.NORMAL}
          onClick={showNormalAnnouncement}
        />
        <InformUpperLayout.InformTypeButton
          type="고정"
          isActive={type === ANNOUNCEMENT_TYPE.PINNED}
          onClick={showPinnedAnnouncement}
        />
      </InformUpperLayout>
      <BoundaryLine />
      <AnnounceListContainer type={type as AnnouncementType}>
        <Suspense fallback={<AnnounceCardSkeleton length={30} />}>
          <AnnounceList resource={resource} type={type as AnnouncementType} />
        </Suspense>
      </AnnounceListContainer>
    </Container>
  );
};

export default AnnounceContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const getAnimationType = (type: AnnouncementType) => {
  if (type === 'search') return 'none';
  return type === 'normal' ? AnnounceSlideLeft : AnnounceSlideRight;
};

const AnnounceListContainer = styled.div<{ type: AnnouncementType }>`
  padding: 0 20px 0 20px;

  overflow: hidden;
  animation: ${({ type }) => getAnimationType(type)} 0.3s forwards;
`;

const AnnounceSlideRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const AnnounceSlideLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const BoundaryLine = styled.hr`
  height: 1px;
  width: calc(100% - 40px);
  margin: 0 auto;
  background-color: ${THEME.TEXT.BLACK};
  border: none;
`;
