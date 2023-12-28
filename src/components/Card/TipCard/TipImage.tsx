import Image from '@components/Common/Image';
import { css } from '@emotion/react';
import React from 'react';

interface TipImageProps {
  title: string;
  webpPath: string;
  pngPath: string;
}

const TipImage = ({ title, webpPath, pngPath }: TipImageProps) => {
  return (
    <picture>
      <source srcSet={webpPath} type="image/webp" />
      <Image
        src={pngPath}
        size="tiny"
        alt={title}
        css={css`
          padding: 0 16px 16px 0;
          position: absolute;
          z-index: -1;
          right: 0;
          bottom: 0;
          opacity: 0.2;
        `}
      />
    </picture>
  );
};

export default TipImage;
