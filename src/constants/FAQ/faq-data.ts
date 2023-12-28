interface FAQ {
  readonly question: string;
  readonly answer: {
    readonly text: string;
    readonly link?: string;
  };
}

const FAQ_DATA: FAQ[] = [
  {
    question: '"부경 등대"의 의미는 무엇인가요?',
    answer: {
      text: '부경 등대는 "부경대 학생들이 학교를 더 알차게 다닐 수 있도록 등대처럼 길을 밝혀준다"는 의미입니다 :)\n기존의 부림이(부경대 알림이)에서 변경된 새로운 이름 입니다.',
    },
  },
  {
    question: '공지사항 알림이 오지 않아요!',
    answer: {
      text: 'IOS를 사용하고 앱 스토어에서 "부림이"를 다운 받은 경우 스토어 정책 상 알림 기능이 동작하지 않습니다.\n만약 이미 앱 스토어에서 다운 받았다면 "이미 앱스토어에서 어플을 설치 했어요"의 내용을 확인해주세요 :)\n앱 스토어에서 받지 않았는데 알림이 오지 않는다면 IOS 버젼이 16.4 이상인지 확인해주세요.',
    },
  },
  {
    question: '카카오 맵을 설치해야 할까요?',
    answer: {
      text: '지도 페이지의 기능들은 모두 카카오 맵이 제공해주는 기능들을 활용해서 만들어졌습니다.\n 카카오 맵이 설치되어 있지 않은 경우는 길찾기 기능이 제한될 수 있으니 설치 후 건물 길찾기 기능을 이용해보세요 :)',
    },
  },
  {
    question: '키워드 알림은 언제 되나요?',
    answer: {
      text: '키워드 알림 기능은 현재 개발 진행 중에 있습니다.\n조금만 더 기다려주시면 키워드 알림 기능도 제공해드릴게요 :)',
    },
  },
  {
    question: '이미 앱스토어로 다운 받았어요.(IOS)',
    answer: {
      text: '이미 앱스토어로 다운 받으셨다면 기존의 앱을 지운 후 아래의 링크로 이동해 방법을 따라해주세요 :)',
      link: 'https://burimi.notion.site/IOS-71bbd68542f24b8db00718367d327597',
    },
  },
];

export default FAQ_DATA;
