import { rest, RequestHandler } from 'msw';

export const handlers: RequestHandler[] = [
  rest.get('http://localhost:8080/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Hello, world!' }));
  }),
];
