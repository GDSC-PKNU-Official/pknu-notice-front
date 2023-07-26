import { SERVER_URL } from '@config/index';
import { RequestHandler, rest } from 'msw';

type GRADUATION_LINK = {
  [key in string]: {
    link: string;
  };
};

const MOCK_GRDUATION_LINK: GRADUATION_LINK = {
  컴퓨터인공지능학부: {
    link: 'https://ce.pknu.ac.kr/ce/2889',
  },
  데이터정보과학부: {
    link: 'https://www.youtube.com',
  },
  '조형학부 건축학전공': {
    link: 'https://www.naver.com',
  },
  미디어커뮤니케이션학부: {
    link: 'https://www.google.com',
  },
};

export const graduationHandler: RequestHandler[] = [
  rest.get(`${SERVER_URL}/api/graduation`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const major = query.get('major');
    if (major) {
      return res(
        ctx.status(200),
        ctx.json({
          major: major,
          graduationLink: MOCK_GRDUATION_LINK[major].link,
        }),
      );
    }
  }),
];
