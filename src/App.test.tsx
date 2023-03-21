import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import App from './App';

describe('App 컴포넌트', () => {
  it('페이지에 "App"이라는 텍스트가 렌더링된다.', () => {
    render(<App />);
    const textElement = screen.getByText(/App/i);
    expect(textElement).toBeInTheDocument();
  });
});
