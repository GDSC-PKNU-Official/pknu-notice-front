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
  const userLocation = useUserLocation();
  const { openModal } = useModals();

  const handleOpenModal = (
    title: string,
    btn1Text: string,
    onClick?: () => void,
    btn2Text?: string,
  ) => {
    openModal(
      <Modal>
        <Modal.ModalTitle title={title} />
        <Modal.ModalButton text={btn1Text} />
        {btn2Text && <Modal.ModalButton text={btn2Text} onClick={onClick} />}
      </Modal>,
    );
  };

  const customOverlay = new CustomOverlay(handleOpenModal, userLocation);

  return (
    <OverlayContext.Provider value={customOverlay}>
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
