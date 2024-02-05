export const ANNOUNCEMENT_TITLE = {
  SCHOOL: '학교 공지사항',
  MAROR: '학과 공지사항',
  LANGUAGE: '어학 공지사항',
  RECRUIT: '채용 공지사항',
  GRADUATION: '졸업요건',
};

export const ANNOUNCEMENT_CATEGORY = {
  SCHOOL: 'school',
  MAJOR: 'major',
  LANGUAGE: 'language',
  RECRUIT: 'recruit',
} as const;

export const ANNOUNCEMENT_TYPE = {
  NORMAL: 'normal',
  PINNED: 'pinned',
  SEARCH: 'search',
} as const;
