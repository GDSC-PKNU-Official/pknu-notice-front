import styled from '@emotion/styled';
import { setSize } from '@utils/styles/size';
import React, { CSSProperties } from 'react';
import { Size, SizeOption } from 'src/@types/styles/size';

type ImageSize = {
  [key in SizeOption]: Size;
};

const imageSize: ImageSize = {
  large: setSize(200),
  medium: setSize(150),
  small: setSize(100),
};

interface ImageProps {
  src: string;
  outline?: boolean;
  size?: SizeOption;
}

const Image = ({ src, outline = false, size = 'medium' }: ImageProps) => {
  return (
    <StyledImage src={src} alt="" outline={outline} {...imageSize[size]} />
  );
};

type ImageStyleProps = Pick<ImageProps, 'outline'> & {
  width: CSSProperties['width'];
  height: CSSProperties['height'];
};

const StyledImage = styled.img<ImageStyleProps>(
  ({ width, height, outline }) => {
    return {
      width,
      height,
      border: outline ? '3px solid black' : '',
      borderRadius: '10px',
    };
  },
);

export default Image;
