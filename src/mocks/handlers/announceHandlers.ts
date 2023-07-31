import { SERVER_URL } from '@config/index';
import { RequestHandler, rest } from 'msw';

export const announceHandlers: RequestHandler[] = [
  rest.get(`${SERVER_URL}/api/announcement`, (req, res, ctx) => {
    const query = req.url.searchParams;
    if (query.get('major') === 'undefined') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            title:
              '★대학원생 취·창업 역량 강화 프로그램★ 4단계 BK21 대학원혁신지원사업',
            path: 'https://www.pknu.ac.kr/main/163?action=view&no=711472&cd=10001',
            date: '2023-07-17',
          },
          {
            title: '2023-2학기 재(복)학생, 재입학생 등록금 납부 안내',
            path: 'https://www.pknu.ac.kr/main/163?action=view&no=711433&cd=10001',
            date: '2023-07-14',
          },
          {
            title: '2023-2학기 재(복)학생 등록금 분할납부 신청 안내',
            path: 'https://www.pknu.ac.kr/main/163?action=view&no=711431&cd=10001',
            date: '2023-07-14',
          },
        ]),
      );
    } else if (query.get('major') === '컴퓨터인공지능학부') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            title: '2023 정보융합대학 프로그래밍 경진대회 개최 (5/17)',
            path: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934358',
            date: '2023-04-27',
          },
          {
            title: '★ (05/01부터 적용) 출석 인정 신청 방법 안내 ★',
            path: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934257',
            date: '2023-04-26	',
          },
          {
            title:
              '2023-1학기 (재)부경대학교발전기금재단 정효택장학생 선발 안내(5/8~5/11)',
            path: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934104',
            date: '2023-04-20',
          },
        ]),
      );
    }
  }),
];
