import ThemeProvider from '@styles/ThemeProvider';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import InformCard from './index';

describe('Card 클릭 시 페이지 이동이 잘 되는지에 대한 테스트', () => {
  it('공지사항 클릭 테스트', () => {
    const icon = 'notification';
    const title = '공지사항';
    const path = 'announcement';
    const testComponent = render(
      <ThemeProvider>
        <BrowserRouter>
          <InformCard icon={icon} title={title} path={path} />,
        </BrowserRouter>
      </ThemeProvider>,
    );

    const card = testComponent.container.querySelector('div');
    if (card) {
      fireEvent.click(card);
      expect(window.location.pathname).toBe(`/${path}`);
    }
  });

  it('졸업요건 클릭 테스트', () => {
    const icon = 'school';
    const title = '졸업요건';
    const path = 'announcement';
    const testComponent = render(
      <ThemeProvider>
        <BrowserRouter>
          <InformCard icon={icon} title={title} path={path} />,
        </BrowserRouter>
      </ThemeProvider>,
    );

    const card = testComponent.container.querySelector('div');

    if (card) {
      fireEvent.click(card);
      expect(window.location.pathname).toBe(`/${path}`);
    }
  });
});
