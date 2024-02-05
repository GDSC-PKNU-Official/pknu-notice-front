import MajorProvider from '@components/Providers/MajorProvider';
import ModalsProvider from '@components/Providers/ModalsProvider';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import Home from './index';

interface TextInScreen {
  [key: string]: string;
}

describe('Home Page 컴포넌트 테스트', () => {
  it('페이지에 공지사항 및 졸업요건 컴포넌트가 렌더링된다.', () => {
    render(
      <MajorProvider>
        <ModalsProvider>
          <Home />
        </ModalsProvider>
      </MajorProvider>,
      {
        wrapper: MemoryRouter,
      },
    );

    const EXPECTED_TEXT: TextInScreen = {
      school: '학교 공지사항 보러가기',
      major: '학과 공지사항 보러가기',
      graduation: '졸업요건 보러가기',
    };

    Object.keys(EXPECTED_TEXT).forEach((key) => {
      const expectedText = screen.getByText(EXPECTED_TEXT[key]);
      expect(expectedText).toBeInTheDocument();
    });
  });
});
