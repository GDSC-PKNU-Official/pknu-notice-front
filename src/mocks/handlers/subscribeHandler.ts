import { SERVER_URL } from '@config/index';
import { RequestHandler, rest } from 'msw';

export const subscribeHandler: RequestHandler[] = [
  rest.post(SERVER_URL + '/api/subscription', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(SERVER_URL + '/api/subscription', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
