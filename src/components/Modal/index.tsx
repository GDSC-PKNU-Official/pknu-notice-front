import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: JSX.Element;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalBackground onClick={onClick}>
      <ModalContent>{children}</ModalContent>
    </ModalBackground>
  );
};

export default Modal;

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
  display: flex;
  flex-direction: column;

  animation: ${modalIn} 0.3s ease-out;
  width: 80%;
  padding: 30px;
  border-radius: 15px;
  background-color: ${THEME.TEXT.WHITE};
  color: ${THEME.TEXT.GRAY};
  font-weight: bold;
`;
