type Category = 'school' | 'major' | 'language' | 'recruit';

const PATH = {
  SCHOOL_ANNOUNCEMENT: '/school/:type',
  MAJOR_ANNOUNCEMENT: '/major/:type',
  LANGUAGE_ANNOUNCEMENT: '/language/:type',
  RECRUIT_ANNOUNCEMENT: '/recruit/:type',
  NORMAL_ANNOUNCEMENT: (category: Category) =>
    `/announcement/${category}/normal`,
  PINNED_ANNOUNCEMENT: (category: Category) =>
    `/announcement/${category}/pinned`,
  SEARCH_ANNOUNCEMENT: (category: Category, keyword: string) =>
    `/announcement/${category}/search?q=${keyword}`,
  TIP: {
    SHORTCUT: '/tip/shortcut',
    HONEY_TIP: '/tip/honeytip',
  },
} as const;

export default PATH;
