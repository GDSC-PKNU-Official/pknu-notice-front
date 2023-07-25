import Modal from '@components/Modal';
import { css } from '@emotion/react';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface MapBoundsLimitModal {
  onClose: () => void;
}

const MapBoundsLimitModal = ({ onClose }: MapBoundsLimitModal) => {
  return (
    <Modal onClose={onClose}>
      <>
        <span
          css={css`
            color: ${THEME.TEXT.GRAY};
            font-weight: bold;
            margin: 0 auto;
          `}
        >
          앗! 지도의 범위를 벗어났어요.
        </span>
      </>
    </Modal>
  );
};

export default MapBoundsLimitModal;
