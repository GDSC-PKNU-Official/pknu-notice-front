import { AnnounceItemList } from '@type/announcement';
import { AxiosError, AxiosResponse } from 'axios';

import AnnounceCard from '..';

type Resource =
  | AxiosResponse<AnnounceItemList>
  | AnnounceItemList
  | AxiosError
  | null;

interface AnnounceListProps {
  resource: {
    read: () => Resource;
  };
}

const AnnounceList = ({ resource }: AnnounceListProps) => {
  const announceList: Resource = resource.read();

  if (announceList === null || announceList instanceof Error) {
    return null;
  }
  const { 고정: pinned, 일반: normal } = announceList as AnnounceItemList;

  return (
    <>
      {pinned.map((announce, idx) => (
        <div key={idx}>
          <AnnounceCard {...announce} pinned={true} />
        </div>
      ))}
      {normal.map((announce, idx) => (
        <div key={idx}>
          <AnnounceCard {...announce} />
        </div>
      ))}
    </>
  );
};

export default AnnounceList;
