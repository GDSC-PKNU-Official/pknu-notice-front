import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import CollegeList from './index';

describe('단과대 선택 테스트', () => {
  it('클릭 시 URL 이동 확인', async () => {
    const { location } = window;
    window.location = { ...location, href: '' };

    await act(async () => {
      render(<CollegeList />, { wrapper: MemoryRouter });
    });

    const collegeList = await screen.findAllByTestId('collegeList');
    collegeList.forEach(async (college) => {
      await userEvent.click(college);
      expect(window.location.href).toBe(`majorDecision/${college}`);
    });
    window.location = location;
  });
});
