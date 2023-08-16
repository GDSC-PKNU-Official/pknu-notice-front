import { SERVER_URL } from '@config/index';
import { RequestHandler, rest } from 'msw';

interface GraduationLink {
  department: string;
  link: string;
}

const MOCK_GRDUATION_LINK: GraduationLink[] = [
  {
    department: '데이터정보과학부',
    link: 'https://archieng.pknu.ac.kr/archieng/1423?action=view&no=9911252',
  },
  {
    department: '미디어커뮤니케이션학부',
    link: 'https://masscom.pknu.ac.kr/comm/3128?action=view&no=9916308',
  },
  {
    department: '컴퓨터인공지능학부',
    link: 'https://ce.pknu.ac.kr/ce/2889',
  },
  {
    department: '조형학부 건축학전공',
    link: 'https://pknuarchi.pknu.ac.kr/pknuarchi/969?action=view&no=9933526',
  },
];

export const graduationHandler: RequestHandler[] = [
  rest.get(`${SERVER_URL}/api/graduation`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const major = query.get('major');
    if (major) {
      return res(
        ctx.status(200),
        ctx.json({
          department: major,
          link: MOCK_GRDUATION_LINK[
            MOCK_GRDUATION_LINK.findIndex(
              (graduationLink) => graduationLink.department === major,
            )
          ].link,
        }),
      );
    }
  }),
];
