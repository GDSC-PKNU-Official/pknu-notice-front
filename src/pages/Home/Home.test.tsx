import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from './index';

describe('App 컴포넌트', () => {
  it('페이지에 "App"이라는 텍스트가 렌더링된다.', () => {
    render(<Home />);
    const textElement = screen.getByText(/메인/i);
    expect(textElement).toBeInTheDocument();
  });
});
