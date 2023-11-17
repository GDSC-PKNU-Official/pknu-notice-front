type Category = 'school' | 'major';

const PATH = {
  SCHOOL_ANNOUNCEMENT: '/school/:type',
  MAJOR_ANNOUNCEMENT: '/major/:type',
  NORMAL_ANNOUNCEMENT: (category: Category) =>
    `/announcement/${category}/normal`,
  PINNED_ANNOUNCEMENT: (category: Category) =>
    `/announcement/${category}/pinned`,
  SEARCH_ANNOUNCEMENT: (category: Category, keyword: string) =>
    `/announcement/${category}/search?q=${keyword}`,
} as const;

export default PATH;
