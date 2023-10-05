import OverlayContext from '@contexts/overlays';
import useModals from '@hooks/useModals';
import useUserLocation from '@hooks/useUserLocation';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { CustomOverlay } from '../handlers';

const MapProvider = () => {
  const { openModal, closeModal } = useModals();
  const userLocation = useUserLocation();
  const customOverlay = new CustomOverlay(openModal, closeModal, userLocation);

  return (
    <OverlayContext.Provider value={customOverlay}>
      <Outlet />
    </OverlayContext.Provider>
  );
};

export default MapProvider;
