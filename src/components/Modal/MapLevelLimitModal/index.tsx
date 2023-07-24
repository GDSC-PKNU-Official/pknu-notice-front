import { css } from '@emotion/react';
import { THEME } from '@styles/ThemeProvider/theme';

import Modal from '..';

interface MapLevetLimitModalProps {
  onClose: () => void;
}

const MapLevetLimitModal = ({ onClose }: MapLevetLimitModalProps) => {
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
          앗! 지도를 더이상 축소할 수 없어요
        </span>
      </>
    </Modal>
  );
};

export default MapLevetLimitModal;
