import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useModals from '@hooks/useModals';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

import getModalSubElement from './domain/getModalSubElement';
import ModalButton from './ModalButton';
import ModalTitle from './ModalTitle';

type StaticPropsWithChidren<T = unknown> = T & { children: React.ReactNode };

const Modal = ({ children }: StaticPropsWithChidren) => {
  const { closeModal } = useModals();

  const modalTitle = getModalSubElement(children, ModalTitle);
  const modalButtons = getModalSubElement(children, ModalButton);
  const hasModalButtons = modalButtons.length !== 0;

  const onBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalBackground onClick={onBackgroundClick}>
      <ModalContent>
        {modalTitle}
        {hasModalButtons && (
          <ModalButtonsContainer>{modalButtons}</ModalButtonsContainer>
        )}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;

Modal.ModalTitle = ModalTitle;
Modal.ModalButton = ModalButton;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

const modalIn = keyframes`
  from{
    opacity: 0;
    transform: translateY(-30px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalContent = styled.div`
  max-height: 70vh;
  max-width: 480px;
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0 30px 0 30px;
  overflow: auto;
  border-radius: 15px;
  background-color: ${THEME.TEXT.WHITE};
  animation: ${modalIn} 0.3s ease-out;
`;

const ModalButtonsContainer = styled.div`
  padding: 0 0 20px 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
