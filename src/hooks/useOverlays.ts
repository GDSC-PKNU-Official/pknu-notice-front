import OverlayContext from '@contexts/overlays';
import { useContext } from 'react';

const useOverlays = () => {
  const overlayContext = useContext(OverlayContext);

  if (!overlayContext) {
    throw new Error('OverlayContext does not exists.');
  }

  const customOverlay = overlayContext;
  const addOverlay = customOverlay.addOverlay.bind(customOverlay);
  const handleOverlays = customOverlay.handleOverlays.bind(customOverlay);

  return {
    addOverlay,
    handleOverlays,
  };
};

export default useOverlays;
