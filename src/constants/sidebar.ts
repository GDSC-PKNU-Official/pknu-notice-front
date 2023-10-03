import { IconKind } from '@type/styles/icon';

interface SideBarContent {
  id: number;
  title: string;
  path: string;
  icon: IconKind;
}

const SIDEBAR_CONTENT: SideBarContent[] = [
  {
    id: 0,
    title: '공지사항',
    path: '/announcement',
    icon: 'speaker',
  },
  {
    id: 1,
    title: '꿀팁 페이지',
    path: '/tip',
    icon: 'light',
  },
];

export default SIDEBAR_CONTENT;
