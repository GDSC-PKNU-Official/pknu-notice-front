import { ANNOUNCEMENT_TYPE } from '@constants/announcement';
import styled from '@emotion/styled';
import { AnnounceSearchList } from '@pages/Announcement/components';
import { THEME } from '@styles/ThemeProvider/theme';
import { AnnounceItemList, AnnouncementType } from '@type/announcement';
import { AxiosError, AxiosResponse } from 'axios';
import { Fragment } from 'react';

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
  type: AnnouncementType;
}

const AnnounceList = ({ resource, type }: AnnounceListProps) => {
  const announceList: Resource = resource.read();
  if (announceList === null || announceList instanceof Error) {
    return <></>;
  }

  const { 고정: pinnedAnnouncement, 일반: normalAnnouncemnet } =
    announceList as AnnounceItemList;

  return (
    <>
      <BoundaryLine />
      {type === ANNOUNCEMENT_TYPE.NORMAL &&
        normalAnnouncemnet.map((announce, idx) => (
          <Fragment key={idx}>
            <AnnounceCard {...announce} />
          </Fragment>
        ))}
      {type === ANNOUNCEMENT_TYPE.PINNED &&
        pinnedAnnouncement.map((announce, idx) => (
          <Fragment key={idx}>
            <AnnounceCard {...announce} />
          </Fragment>
        ))}
      {type === ANNOUNCEMENT_TYPE.SEARCH && (
        <AnnounceSearchList
          announceList={[...pinnedAnnouncement, ...normalAnnouncemnet]}
        />
      )}
    </>
  );
};

export default AnnounceList;

const BoundaryLine = styled.div`
  border-bottom: 1px solid ${THEME.TEXT.BLACK};
`;
