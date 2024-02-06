import { SizeOption } from '@type/styles/size';
import React from 'react';

import Image from '../Image';

interface WebpImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wepbPath: string;
  normalPath: string;
  title: string;
  size?: SizeOption;
}

const WebpImage = ({
  wepbPath,
  normalPath,
  title,
  size = 'medium',
  ...props
}: WebpImageProps) => {
  return (
    <picture>
      <source srcSet={wepbPath} type="image/webp" />
      <Image src={normalPath} alt={title} size={size} {...props} />
    </picture>
  );
};

export default WebpImage;
