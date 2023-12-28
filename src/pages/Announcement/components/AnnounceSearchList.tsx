import AnnounceCard from '@components/Card/AnnounceCard';
import { AnnounceItem } from '@type/announcement';
import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import AnnounceNotFound from './AnnounceNotFound';

interface AnnounceSearchProps {
  announceList: AnnounceItem[];
}

const AnnounceSearchList = ({ announceList }: AnnounceSearchProps) => {
  const { search } = useLocation();

  const searchKeyword = decodeURI(search.split('=')[1]);
  const searchResult = announceList.filter((announceItem) =>
    announceItem.title.includes(searchKeyword),
  );
  const hasSearchResult = () => searchResult.length !== 0;

  return (
    <Fragment>
      {hasSearchResult() ? (
        searchResult.map((announce, idx) => (
          <Fragment key={idx}>
            <AnnounceCard {...announce} />
          </Fragment>
        ))
      ) : (
        <AnnounceNotFound keyword={searchKeyword} />
      )}
    </Fragment>
  );
};

export default AnnounceSearchList;
