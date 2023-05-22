import { AxiosError, AxiosResponse } from 'axios';

type PromiseResult<T> = AxiosResponse<T> | AxiosError | null;
type PromiseStatus = 'pending' | 'resolve' | 'error';

const wrapPromise = <T>(promise: Promise<AxiosResponse<T>>) => {
  let response: PromiseResult<T> = null;
  let status: PromiseStatus = 'pending';

  const suspender = promise.then(
    (res: AxiosResponse<T>) => {
      setTimeout(() => {
        status = 'resolve';
        response = res;
      }, 3000);
    },
    (err: AxiosError) => {
      status = 'error';
      response = err;
    },
  );

  return {
    read: () => {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'error':
          return response;
        default:
          return response;
      }
    },
  };
};

export default wrapPromise;
