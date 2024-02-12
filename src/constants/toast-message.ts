const TOAST_MESSAGES = {
  OUT_OF_BOUNDARY: '학교 외부로 이동할 수 없어요!',
  OUT_OF_SHOOL: '학교 밖에서는 내 위치 정보를 제공하지 않아요!',
  SHARE_LOCATION: '위치 정보를 공유해 주세요',
  SEARCH_KEYWORD: '검색어를 입력해주세요',
  NEED_SUBSCRIBE: '알림 설정을 먼저 해주세요',
  NEED_MORE_TEXT: '2글자 이상 입력해주세요',
  DUPLICATE_KEYWORD: '중복된 키워드가 설정되어있습니다',
  EXCEED_SUBSCRIBE_MAX_COUNT: '키워드는 최대 5개까지 설정 가능합니다',
  ERROR_MESSAGE: '일시적인 에러발생',
} as const;

export default TOAST_MESSAGES;
