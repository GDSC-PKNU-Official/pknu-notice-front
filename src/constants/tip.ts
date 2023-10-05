import { IconKind } from '@type/styles/icon';

import ASSET_PATH from './assets-path';

interface SideBarContent {
  readonly id: number;
  readonly title: string;
  readonly path: string;
  readonly iconKind?: IconKind;
  readonly imagePath?: string;
}

const TIP_CONTENT: SideBarContent[] = [
  {
    id: 1,
    title: '부경대학교',
    path: 'https://www.pknu.ac.kr/main',
    imagePath: `${ASSET_PATH.PKNU}`,
  },
  {
    id: 2,
    title: '웨일비',
    path: 'https://whalebe.pknu.ac.kr/main/1',
    imagePath: `${ASSET_PATH.WHALEBE}`,
  },
  {
    id: 3,
    title: '진로취업길라잡이',
    path: 'https://pknujob.pknu.ac.kr/main',
    iconKind: 'handshake',
  },
  {
    id: 4,
    title: '증명서발급센터',
    path: 'https://pknu.certpia.com/',
    iconKind: 'print',
  },
  {
    id: 5,
    title: '강의계획서 조회',
    path: 'https://irumi.pknu.ac.kr/nxui/launch.html?screenid=Desktop_screen_quick&menuId=U020913',
    iconKind: 'document',
  },
  {
    id: 6,
    title: '아르바이트',
    path: 'https://www.pknu.ac.kr/main/145',
    iconKind: 'personSearch',
  },
];

export default TIP_CONTENT;
