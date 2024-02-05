import WebpImage from '@components/Common/WebpImage';
import { css } from '@emotion/react';
import React from 'react';

interface TipImageProps {
  title: string;
  webpPath: string;
  normalPath: string;
}

const TipImage = ({ title, webpPath, normalPath }: TipImageProps) => {
  return (
    <WebpImage
      wepbPath={webpPath}
      normalPath={normalPath}
      title={title}
      size="tiny"
      css={css`
        padding: 0 16px 16px 0;
        position: absolute;
        z-index: -1;
        right: 0;
        bottom: 0;
        opacity: 0.2;
      `}
    />
  );
};

export default TipImage;
