import Major from '@type/major';
import { AxiosResponse } from 'axios';

import wrapPromise from './wrap-promise';
import http from '../http';

const fetchAnnounceList = <T>(major: Major) => {
  const promise: Promise<AxiosResponse<T>> = http
    .get(major ? `/api/announcement?major=${major}` : `/api/announcement`)
    .then((res) => res.data);

  return wrapPromise<T>(promise);
};

export default fetchAnnounceList;
