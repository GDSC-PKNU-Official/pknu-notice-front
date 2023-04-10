import styled from '@emotion/styled';
import { ImageSize, ImageProps } from '@type/styles/image';
import { setSize } from '@utils/styles/size';
import { CSSProperties } from 'react';

const imageSize: ImageSize = {
  large: setSize(200),
  medium: setSize(150),
  small: setSize(100),
};

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
