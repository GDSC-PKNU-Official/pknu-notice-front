import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';

type Size = 'large' | 'medium' | 'small';

type ImageSize = {
  [key in Size]: {
    height: CSSProperties['height'];
    width: CSSProperties['width'];
  };
};

const large = '250 px' as CSSProperties['height' | 'width'];
const medium = '200 px' as CSSProperties['height' | 'width'];
const small = '150 px' as CSSProperties['height' | 'width'];

const imageSize: ImageSize = {
  large: {
    height: large,
    width: large,
  },
  medium: {
    height: medium,
    width: medium,
  },
  small: {
    height: small,
    width: small,
  },
};

interface ImageProps {
  src: string;
  outline?: boolean;
  size?: Size;
}

type ImageStyleProps = Pick<ImageProps, 'outline'> & {
  width: CSSProperties['width'];
  height: CSSProperties['height'];
};

const border: CSSProperties['border'] = '3px solid black';
const StyledImage = styled.img<ImageStyleProps>(
  ({ width, height, outline }) => {
    return {
      width,
      height,
      border: outline ? border : '',
      borderRadius: '10px',
    };
  },
);

const Image = ({ src, outline = false, size = 'medium' }: ImageProps) => {
  return (
    <StyledImage src={src} alt="" outline={outline} {...imageSize[size]} />
  );
};

export default Image;
