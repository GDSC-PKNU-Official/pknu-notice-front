import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import CollegeList from './index';

describe.skip('단과대 선택 테스트', () => {
  it('클릭 시 URL 이동 확인', async () => {
    await act(async () => {
      render(<CollegeList />, { wrapper: MemoryRouter });
    });

    const college = await screen.findByText('정보융합대학');
    await act(async () => {
      await userEvent.click(college);
    });
    expect(window.location.pathname).toBe('/major-decision?major=정보융합대학');
  });
});
