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
