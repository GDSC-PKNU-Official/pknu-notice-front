import {
  ANNOUNCEMENT_CATEGORY,
  ANNOUNCEMENT_TITLE,
} from '@constants/announcement';
import PATH from '@constants/path';
import useMajor from '@hooks/useMajor';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AnnounceContainer } from './components';

const Announcement = () => {
  const { major } = useMajor();

  return (
    <Routes>
      <Route
        path={PATH.SCHOOL_ANNOUNCEMENT}
        element={
          <AnnounceContainer
            title={ANNOUNCEMENT_TITLE.SCHOOL}
            category={ANNOUNCEMENT_CATEGORY.SCHOOL}
            endPoint=""
          />
        }
      />
      <Route
        path={PATH.MAJOR_ANNOUNCEMENT}
        element={
          <AnnounceContainer
            title={ANNOUNCEMENT_TITLE.MAROR}
            category={ANNOUNCEMENT_CATEGORY.MAJOR}
            endPoint={'?major=' + major}
          />
        }
      />
      <Route
        path={PATH.LANGUAGE_ANNOUNCEMENT}
        element={
          <AnnounceContainer
            title={ANNOUNCEMENT_TITLE.LANGUAGE}
            category={ANNOUNCEMENT_CATEGORY.LANGUAGE}
            endPoint={'/language'}
          />
        }
      />
    </Routes>
  );
};

export default Announcement;
