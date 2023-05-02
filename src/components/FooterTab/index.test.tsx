import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import FooterTab from './index';

describe('하단 탭 아이콘 클릭 테스트', () => {
  const getIcons = () => screen.getAllByRole('button');

  it('클릭된 버튼을 primary 색으로 설정', () => {
    render(<FooterTab />, { wrapper: MemoryRouter });
    const icons = getIcons();

    icons.forEach(async (icon) => {
      await userEvent.click(icon);
      icons.forEach((i) => {
        const expectedColor = i === icon ? '#71BC5C' : 'black';
        expect(i).toHaveStyle(`color: ${expectedColor}`);
      });
    });
  });

  it('버튼 클릭 시 URL 이동', () => {
    render(<FooterTab />, { wrapper: MemoryRouter });
    const icons = getIcons();

    const { location } = window;
    window.location = { ...location, href: '' };

    const urls = ['/map', '/', '/my'];
    icons.forEach(async (icon, index) => {
      await userEvent.click(icon);

      expect(window.location.href).toBe(urls[index]);
    });

    window.location = location;
  });
});
