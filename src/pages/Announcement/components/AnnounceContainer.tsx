import fetchAnnounceList from '@apis/Suspense/fetch-announce-list';
import AnnounceList from '@components/List/AnnounceList';
import AnnounceCardSkeleton from '@components/List/AnnounceList/Skeleton';
import { ANNOUNCEMENT_TYPE } from '@constants/announcement';
import PATH from '@constants/path';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import {
  AnnounceItemList,
  AnnouncementCategory,
  AnnouncementType,
} from '@type/announcement';
import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import AnnounceSearch from './AnnounceSearch';
import AnnounceTypeButtons from './AnnounceTypeButtons';

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
      <AnnounceTitle>{title}</AnnounceTitle>
      <AnnounceSearch category={category} />
      <ButtonContainer>
        <AnnounceTypeButtons
          type="일반"
          onClick={showNormalAnnouncement}
          isActive={type === ANNOUNCEMENT_TYPE.NORMAL}
        />
        <AnnounceTypeButtons
          type="고정"
          onClick={showPinnedAnnouncement}
          isActive={type === ANNOUNCEMENT_TYPE.PINNED}
        />
      </ButtonContainer>
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
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  row-gap: 15px;
  padding: 10px;
`;

const AnnounceTitle = styled.span`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;

const getAnimationType = (type: AnnouncementType) => {
  if (type === 'search') return 'none';
  return type === 'normal' ? AnnounceSlideLeft : AnnounceSlideRight;
};

const AnnounceListContainer = styled.div<{ type: AnnouncementType }>`
  width: 100%;
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
