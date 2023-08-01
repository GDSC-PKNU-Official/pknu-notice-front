import { SERVER_URL } from '@config/index';
import { RequestHandler, rest } from 'msw';

export const announceHandlers: RequestHandler[] = [
  rest.get(`${SERVER_URL}/api/announcement`, (req, res, ctx) => {
    const query = req.url.searchParams;
    if (query.get('major') === 'undefined') {
      return res(
        ctx.status(200),
        ctx.json({
          고정: [
            {
              title: '2023-2학기 국가근로장학금 대학신청 일정 안내',
              link: 'https://www.pknu.ac.kr/main/163?action=view&no=711641',
              uploadDate: '2023-08-01',
            },
            {
              title: '2023-2학기 재(복)학생, 재입학생 등록금 납부 안내',
              link: 'https://www.pknu.ac.kr/main/163?action=view&no=711433',
              uploadDate: '2023-07-14	',
            },
            {
              title: '2023-2학기 재(복)학생 등록금 분할납부 신청 안내',
              link: 'https://www.pknu.ac.kr/main/163?action=view&no=711431',
              uploadDate: '2023-07-14',
            },
          ],
          일반: [
            {
              title: '2023 정보융합대학 프로그래밍 경진대회 개최 (5/17)',
              link: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934358',
              uploadDate: '2023-04-27',
            },
            {
              title: '★ (05/01부터 적용) 출석 인정 신청 방법 안내 ★',
              link: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934257',
              uploadDate: '2023-04-26	',
            },
            {
              title:
                '2023-1학기 (재)부경대학교발전기금재단 정효택장학생 선발 안내(5/8~5/11)',
              link: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934104',
              uploadDate: '2023-04-20',
            },
          ],
        }),
      );
    } else if (query.get('major') === '컴퓨터인공지능학부') {
      return res(
        ctx.status(200),
        ctx.json({
          고정: [
            {
              title: '2023 정보융합대학 프로그래밍 경진대회 개최 (5/17)',
              link: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934358',
              uploadDate: '2023-04-27',
            },
            {
              title: '★ (05/01부터 적용) 출석 인정 신청 방법 안내 ★',
              link: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934257',
              uploadDate: '2023-04-26	',
            },
            {
              title:
                '2023-1학기 (재)부경대학교발전기금재단 정효택장학생 선발 안내(5/8~5/11)',
              link: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934104',
              uploadDate: '2023-04-20',
            },
          ],
          일반: [
            {
              title: '2023 정보융합대학 프로그래밍 경진대회 개최 (5/17)',
              link: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934358',
              uploadDate: '2023-04-27',
            },
            {
              title: '★ (05/01부터 적용) 출석 인정 신청 방법 안내 ★',
              link: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934257',
              uploadDate: '2023-04-26	',
            },
            {
              title:
                '2023-1학기 (재)부경대학교발전기금재단 정효택장학생 선발 안내(5/8~5/11)',
              link: 'https://ce.pknu.ac.kr/ce/1814?action=view&no=9934104',
              uploadDate: '2023-04-20',
            },
          ],
        }),
      );
    }
  }),
];
