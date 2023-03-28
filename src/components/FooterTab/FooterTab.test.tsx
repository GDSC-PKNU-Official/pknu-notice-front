import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FooterTab from './index';

describe('하단 탭 컴포넌트', () => {
  const getIcons = (): HTMLElement[] => screen.getAllByRole('icon');

  it('클릭된 버튼을 primary 색으로 설정', () => {
    render(<FooterTab />);
    const icons = getIcons();

    icons.forEach((icon) => {
      userEvent.click(icon);
      expect(icon).toHaveStyle({ color: '71BC5C' });
    });
  });

  it('버튼 클릭 시 URL 이동', () => {
    render(<FooterTab />);
    const icons = getIcons();

    const { location } = window;
    window.location = { ...location, href: '' };

    icons.forEach((icon, index) => {
      userEvent.click(icon);

      const urls = [
        'https://example.com/icon1',
        'https://example.com/icon2',
        'https://example.com/icon3',
      ];

      expect(window.location.href).toBe(urls[index]);
    });

    window.location = location;
  });
});
