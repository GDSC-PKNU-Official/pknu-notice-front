import { AnnounceItem } from '@type/announcement';
import { AxiosError, AxiosResponse } from 'axios';

import AnnounceCard from '..';

type Resource = AxiosResponse<AnnounceItem[]> | AxiosError | null;

interface AnnounceListProps {
  resource: {
    read: () => Resource;
  };
}

const AnnounceList = ({ resource }: AnnounceListProps) => {
  const announceList: Resource = resource.read();

  return (
    <>
      {Array.isArray(announceList)
        ? announceList.map((announce, idx) => (
            <div key={idx}>
              <AnnounceCard {...announce} />
            </div>
          ))
        : null}
    </>
  );
};

export default AnnounceList;
