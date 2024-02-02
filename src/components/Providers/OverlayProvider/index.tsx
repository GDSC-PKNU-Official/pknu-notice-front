import Modal from '@components/Common/Modal';
import OverlayContext from '@contexts/overlays';
import useModals from '@hooks/useModals';
import useUserLocation from '@hooks/useUserLocation';
import React from 'react';

import CustomOverlay from './overlay';

interface OverlayProviderProps {
  children: React.ReactNode;
}

const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const customOverlay = new CustomOverlay();

  return (
    <OverlayContext.Provider value={customOverlay}>
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
