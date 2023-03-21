import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';

import { imageSize, Size } from './style';

interface ImageProps {
  src: string;
  outline?: boolean;
  size?: Size;
}

type ImageStyleProps = Pick<ImageProps, 'outline'> & {
  width: CSSProperties['width'];
  height: CSSProperties['height'];
};

const borerImage: CSSProperties['border'] = '3px solid ';

const StyledImage = styled.img<ImageStyleProps>(
  ({ width, height, outline }) => {
    return {
      width,
      height,
      border: outline ? borerImage : '',
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
