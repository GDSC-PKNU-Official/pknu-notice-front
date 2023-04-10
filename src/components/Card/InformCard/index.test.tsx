import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import InformCard from './index';

describe('Card 클릭 시 페이지 이동이 잘 되는지에 대한 테스트', () => {
  it('공지사항 클릭 테스트', () => {
    const ICON = 'notification';
    const TITLE = '공지사항';
    const PATH = 'announcement';
    render(<InformCard icon={ICON} title={TITLE} path={PATH} />, {
      wrapper: MemoryRouter,
    });

    const card = screen.getByTestId('card');

    (async () => {
      await userEvent.click(card);
      waitFor(() => {
        expect(window.location.pathname).toBe(`/${PATH}`);
      });
    })();
  });

  it('졸업요건 클릭 테스트', () => {
    const ICON = 'school';
    const TITLE = '졸업요건';
    const PATH = 'graduation-requirements';
    render(<InformCard icon={ICON} title={TITLE} path={PATH} />, {
      wrapper: MemoryRouter,
    });

    const card = screen.getByTestId('card');

    (async () => {
      await userEvent.click(card);
      waitFor(() => {
        expect(window.location.pathname).toBe(`/${PATH}`);
      });
    })();
  });
});
