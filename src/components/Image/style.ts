import { CSSProperties } from 'react';

export type Size = 'large' | 'medium' | 'small';

const setImageSize = (size: CSSProperties['height' | 'width']) => {
  return {
    height: size,
    width: size,
  };
};

export type ImageSize = {
  [key in Size]: {
    height: CSSProperties['height'];
    width: CSSProperties['width'];
  };
};

export const imageSize: ImageSize = {
  large: {
    ...setImageSize('200 px'),
  },
  medium: {
    ...setImageSize('150 px'),
  },
  small: {
    ...setImageSize('100 px'),
  },
};
