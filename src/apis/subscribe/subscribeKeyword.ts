import http from '@apis/http';

export const fetchSubscribeKeyword = async () => {
  const userToken = localStorage.getItem('subscribe');
  if (!userToken) return;

  const res = await http.get<string[]>(
    '/api/subscription/keyword?userToken=' + userToken,
  );

  return res.data;
};

export const postSubscribeKeyword = async (keyword: string) => {
  const userToken = localStorage.getItem('subscribe');
  if (!userToken) return;

  const res = await http.post('/api/subscription/keyword', {
    data: {
      subscription: JSON.parse(userToken),
      keyword,
    },
  });

  return res;
};

export const deleteSubscribeKeyword = async (keyword: string) => {
  const userToken = localStorage.getItem('subscribe');
  if (!userToken) return;

  const res = await http.delete('/api/subscription/keyword', {
    data: {
      subscription: JSON.parse(userToken),
      keyword,
    },
  });

  return res;
};
