import { SERVER_URL } from '@config/index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnnounceItem } from '@type/announcement';
import axios from 'axios';
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
    const axiosResult = await axios.get(
      `${SERVER_URL}/announcement?major=컴퓨터공학과`,
    );
    const announceList: AnnounceItem[] = axiosResult.data;

    announceList.forEach(async (annouce) => {
      render(<AnnounceCard {...annouce} />, { wrapper: MemoryRouter });
    });

    const annouceCards = screen.getAllByTestId('card');
    annouceCards.forEach(async (card, idx) => {
      await userEvent.click(card);
      expect(window.location.href).toBe(announceList[idx].path);
    });
  });
});
