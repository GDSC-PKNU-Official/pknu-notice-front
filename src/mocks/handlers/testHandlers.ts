import { rest, RequestHandler } from 'msw';

const MOCKSERVERURL = 'http://localhost:8080';

export const testHandlers: RequestHandler[] = [
  rest.get(MOCKSERVERURL + '/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Hello, world!' }));
  }),
];
