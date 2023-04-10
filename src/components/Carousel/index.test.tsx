import { render, screen } from '@testing-library/react';
import { ImageProps } from '@type/styles/image';
import { MemoryRouter } from 'react-router-dom';

import Carousel from './index';

describe('캐러셀 동작 테스트', () => {
  it('2초후 다음 이미지로 자동 전환 테스트', async () => {
    const images: ImageProps[] = [
      { src: 'image1.jpg', alt: 'Image1' },
      { src: 'image2.jpg', alt: 'Image2' },
    ];

    render(<Carousel images={images} />, { wrapper: MemoryRouter });
    const firstImage = screen.getByAltText('Image 1');
    const secondImage = screen.getByAltText('Image 2');

    const INTERVAL = 2000;
    expect(firstImage).toBeInTheDocument();
    expect(secondImage).not.toBeInTheDocument();

    jest.advanceTimersByTime(INTERVAL);

    expect(firstImage).not.toBeInTheDocument();
    expect(secondImage).toBeInTheDocument();
  });
});
