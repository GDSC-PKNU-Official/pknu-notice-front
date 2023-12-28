export interface TipData {
  title: string;
  subTitle: string;
  webpPath: string;
  pngPath: string;
  link: string;
}

export const SHORTCUT_DATA: TipData[] = [
  {
    title: '부경대학교',
    subTitle: '부경대학교\n홈페이지로 이동',
    webpPath: '/assets/tipImages/webp/pknu.webp',
    pngPath: '/assets/tipImages/png/pknu.png',
    link: 'https://www.pknu.ac.kr/main',
  },
  {
    title: '웨일비',
    subTitle: '웨일비 비교과\n홈페이지로 이동',
    webpPath: '/assets/tipImages/webp/baekgyeong_love.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_love.png',
    link: 'https://whalebe.pknu.ac.kr/main',
  },
  {
    title: '진로취업\n길라잡이',
    subTitle: '취업관련\n정보, 검사 하러가기',
    webpPath: '/assets/tipImages/webp/baekgyeong_teach.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_teach.png',
    link: 'https://pknujob.pknu.ac.kr/main',
  },
  {
    title: '증명서\n발급센터',
    subTitle: '각종 증명서\n발급하러 가기',
    webpPath: '/assets/tipImages/webp/baekgyeong_search.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_search.png',
    link: 'https://pknu.certpia.com/',
  },
  {
    title: '이루미',
    subTitle: '부경대 포털 사이트\n바로가기',
    webpPath: '/assets/tipImages/webp/baekgyeong_hand_love.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_hand_love.png',
    link: 'https://portal.pknu.ac.kr/',
  },
  {
    title: '도서관',
    subTitle: '도서관 정보\n확인하기',
    webpPath: '/assets/tipImages/webp/baekgyeong_camera.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_camera.png',
    link: 'https://libweb.pknu.ac.kr/',
  },
  {
    title: '해커스',
    subTitle: '토익, 스피킹 등\n외국어 무료 강좌',
    webpPath: '/assets/tipImages/webp/baekgyeong_hi.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_hi.png',
    link: 'https://pknulib.champstudy.com/',
  },
] as const;

export const HONEY_TIP_DATA: TipData[] = [
  {
    title: '아우란트검사',
    subTitle: '인성·역량·취업준비도\n·진로적성검사',
    webpPath: '/assets/tipImages/webp/baekgyeong_hi.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_hi.png',
    link: 'https://u.educe.co.kr/pknu',
  },
  {
    title: '동아리/스터디',
    subTitle: '동아리/스터디\n모집 정보 알아보기',
    webpPath: '/assets/tipImages/webp/baekgyeong_love.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_love.png',
    link: 'https://www.pknu.ac.kr/main/143',
  },
  {
    title: '아르바이트',
    subTitle: '알바 정보 보러가기',
    webpPath: '/assets/tipImages/webp/baekgyeong_camera.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_camera.png',
    link: 'https://www.pknu.ac.kr/main/145',
  },
  {
    title: '강의계획서\n조회',
    subTitle: '강의정보 열람하기',
    webpPath: '/assets/tipImages/webp/baekgyeong_teach.webp',
    pngPath: '/assets/tipImages/png/baekgyeong_teach.png',
    link: 'https://irumi.pknu.ac.kr/nxui/launch.html?screenid=Desktop_screen_quick&menuId=U020913',
  },
] as const;

export const TIP_TYPE = {
  SHORTCUT: 'shortcut',
  HONEY_TIP: 'honeytip',
} as const;

export const TIP_PAGE = {
  TITLE: '꿀팁 사이트',
  SUB_TITLE:
    '알아두면 쓸모 있는 학교 관련 정보 페이지들입니다.\n카드를 누르면 바로 사이트로 이동해요.',
  BUTTON: {
    SHORTCUT: '바로가기',
    HONEY_TIP: '꿀팁',
  },
} as const;
