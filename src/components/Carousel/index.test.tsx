import { render, screen } from '@testing-library/react';
import { ImageProps } from '@type/styles/image';

import Carousel from './index';

describe('캐러셀 동작 테스트', () => {
  it('2초후 다음 이미지로 자동 전환 테스트', async () => {
    const images: ImageProps[] = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ];

    render(<Carousel images={images} />);
    const firstImage = screen.getAllByText('image1.jpg');
    const secondImage = screen.getAllByText('image2.jpg');

    const INTERVAL = 2000;
    expect(firstImage).toBeInTheDocument();
    expect(secondImage).not.toBeInTheDocument();

    jest.advanceTimersByTime(INTERVAL);

    expect(firstImage).not.toBeInTheDocument();
    expect(secondImage).toBeInTheDocument();
  });
});
