import http from '@apis/http';
import { AnnounceItem } from '@type/announcement';
import Major from '@type/major';
import { useEffect, useState } from 'react';

import AnnounceCard from '..';

interface AnnounceListProps {
  major: Major;
}

const AnnounceList = ({ major }: AnnounceListProps) => {
  const [announceList, setAnnounceList] = useState<AnnounceItem[] | null>(null);

  useEffect(() => {
    (async () => {
      const axiosResult = await http.get(`/announcement?major=${major}`);
      setAnnounceList(axiosResult.data);
    })();
  }, []);

  return (
    <>
      {announceList?.map((announce, idx) => (
        <div key={idx}>
          <AnnounceCard {...announce} />
        </div>
      ))}
    </>
  );
};

export default AnnounceList;
