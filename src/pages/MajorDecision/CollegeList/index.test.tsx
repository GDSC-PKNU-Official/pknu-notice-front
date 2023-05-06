import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import CollegeList from './index';

describe('단과대 선택 테스트', () => {
  it('정융대 단과대 선택한 경우', async () => {
    render(<CollegeList />, { wrapper: MemoryRouter });

    const { location } = window;
    window.location = { ...location, href: '' };

    const InformationConvergenceCollege = await screen.findByText(
      '정보융합대학',
    );
    await userEvent.click(InformationConvergenceCollege);
    expect(window.location.href).toBe('/majorDecision/informationConvergence');
  });
  window.location = location;
});
