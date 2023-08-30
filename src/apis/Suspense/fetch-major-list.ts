import { AxiosResponse } from 'axios';

import wrapPromise from './wrap-promise';
import http from '../http';

const fetchMajorList = <T>(department?: string) => {
  const promise: Promise<AxiosResponse<T>> = http
    .get(department ? `/api/majorDecision/${department}` : `/api/majorDecision`)
    .then((res) => res.data);

  return wrapPromise<T>(promise);
};

export default fetchMajorList;
