import {
  ANNOUNCEMENT_CATEGORY,
  ANNOUNCEMENT_TYPE,
} from '@constants/announcement';

type AnnounceItemType = '고정' | '일반';

export interface AnnounceItem {
  id: number;
  title: string;
  link: string;
  content: string;
  uploadDate: string;
}

export type AnnounceItemList = {
  [key in AnnounceItemType]: AnnounceItem[];
};

export type AnnouncementCategory =
  (typeof ANNOUNCEMENT_CATEGORY)[keyof typeof ANNOUNCEMENT_CATEGORY];

export type AnnouncementType =
  (typeof ANNOUNCEMENT_TYPE)[keyof typeof ANNOUNCEMENT_TYPE];
