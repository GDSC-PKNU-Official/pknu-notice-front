import AnnounceCard from '@components/Card/AnnounceCard';
import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { AnnounceItem } from '@type/announcement';
import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

interface AnnounceSearchProps {
  announceList: AnnounceItem[];
}

const AnnounceSearchList = ({ announceList }: AnnounceSearchProps) => {
  const { search } = useLocation();

  const searchKeyword = decodeURI(search.split('=')[1]);
  const searchResult = announceList.filter((announceItem) =>
    announceItem.title.includes(searchKeyword),
  );
  const hasSearchResult = () => searchResult.length === 0;

  return (
    <Fragment>
      {hasSearchResult() ? (
        searchResult.map((announce, idx) => (
          <Fragment key={idx}>
            <AnnounceCard {...announce} />
          </Fragment>
        ))
      ) : (
        <AnnounceNotFound>
          <Icon kind="warning" color={THEME.TEXT.GRAY} />
          <NotFoundTitle>
            {`"${searchKeyword}"`}에 관한 공지사항이 없습니다.
          </NotFoundTitle>
        </AnnounceNotFound>
      )}
    </Fragment>
  );
};

export default AnnounceSearchList;

const AnnounceNotFound = styled.div`
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NotFoundTitle = styled.span`
  color: ${THEME.TEXT.GRAY};
`;
