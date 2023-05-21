import { SERVER_URL } from '@config/index';
import { rest, RequestHandler } from 'msw';

export const testHandlers: RequestHandler[] = [
  rest.get(SERVER_URL + '/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Hello, world!' }));
  }),
];
