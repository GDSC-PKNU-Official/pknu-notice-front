import { AxiosResponse } from 'axios';

import wrapPromise from './wrap-promise';
import http from '../http';

const fetchAnnounceList = <T>(endPoint: string) => {
  const promise: Promise<AxiosResponse<T>> = http
    .get(`/api/announcement` + endPoint)
    .then((res) => res.data);

  return wrapPromise<T>(promise);
};

export default fetchAnnounceList;
