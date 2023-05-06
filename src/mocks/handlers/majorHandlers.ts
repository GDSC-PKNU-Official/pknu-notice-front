import { rest, RequestHandler } from 'msw';

const MOCKSERVERURL = 'http://localhost:8080';

export const majorHandlers: RequestHandler[] = [
  rest.get(MOCKSERVERURL + '/majorDecision', (req, res, ctx) => {
    const collegeList = ['경영대학', '공과대학', '정보융합대학'];
    return res(ctx.status(200), ctx.json(collegeList));
  }),
  rest.get(MOCKSERVERURL + '/majorDecision/:college', (req, res, ctx) => {
    const { college } = req.params;
    if (college === '정보융합대학') {
      const INFORMATIONCONVERGENCE = [
        '데이터정보과학부',
        '미디어커뮤니케이션학부',
        '컴퓨터인공지능학부',
      ];
      return res(ctx.status(200), ctx.json(INFORMATIONCONVERGENCE));
    }
    return res(ctx.status(404));
  }),
];
