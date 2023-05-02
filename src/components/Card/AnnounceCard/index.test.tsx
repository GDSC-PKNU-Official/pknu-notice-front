import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import AnnounceCard from '.';

describe('공지사항 카드 컴포넌트 테스트', () => {
  const oldWindowLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: false,
      enumerable: true,
      value: oldWindowLocation,
    });
  });

  it('카드 클릭시 페이지 이동 테스트', async () => {
    const data = {
      title: '“아는 만큼 예뻐진다” 최신 CSS 기능 10가지',
      path: 'https://www.itworld.co.kr/t/61023/%EA%B0%9C%EB%B0%9C%EC%9E%90/288031',
      date: '2023-04-24',
      desc: '1996년에 등장한 CSS(Cascading Style Sheets)는 여전히 웹 개발 스택의 필수적인 부분으로 계속 발전하고 있다. 활발하게 사용되는 모든 언어가 그렇듯 CSS도 실제 환경에 대응해 새로운 기능을 끊임없이 내놓고 있다. 이처럼 빠른 발전 속도로 인해 CSS를 주로 다루는 개발자조차 새로운 기능을 놓치기 쉽다. 올해 CSS에 도입되는 가장 유용한 새로운 기능에 대해 알아보자.',
    };

    render(<AnnounceCard {...data} />, { wrapper: MemoryRouter });

    const card = screen.getByTestId('card');
    await userEvent.click(card);
    expect(window.location.href).toBe(data.path);
  });
});
