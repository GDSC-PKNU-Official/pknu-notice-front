import fetchAnnounceList from '@apis/Suspense/fetch-announce-list';
import AnnounceList from '@components/Card/AnnounceCard/AnnounceList';
import AnnounceCardSkeleton from '@components/Card/AnnounceCard/Skeleton';
import MajorProvider from '@components/MajorProvider';
import useMajor from '@hooks/useMajor';
import { Suspense } from 'react';

const Announcement = () => {
  const { major } = useMajor();

  return (
    <>
      <Suspense fallback={<AnnounceCardSkeleton length={30} />}>
        <AnnounceList resource={fetchAnnounceList(major)} />
      </Suspense>
    </>
  );
};
export default Announcement;
