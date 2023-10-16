import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useToasts from '@hooks/useToast';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { useEffect, useState } from 'react';

interface ToastProps {
  id: string;
  message: string;
}

const Toast = ({ id, message }: ToastProps) => {
  const [isClose, setIsClose] = useState<boolean>(false);
  const { removeToast } = useToasts();

  useEffect(() => {
    if (!isClose) return;

    const removeTimer = setTimeout(() => {
      removeToast(id);
    }, 500);
    return () => {
      clearTimeout(removeTimer);
    };
  }, [isClose]);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setIsClose(true);
    }, 2000);
    return () => {
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <Container isClose={isClose}>
      <ToastMessage>{message}</ToastMessage>
    </Container>
  );
};

export default Toast;

const toastSlideIn = keyframes`
  from{
    opacity: 0;
  }to{
    opacity: 1;
  }
`;

const toastSlideOut = keyframes`
  from{
    opacity: 1;
  }to{
    opacity: 0;
  }
`;

const Container = styled.div<{ isClose: boolean }>`
  position: relative;
  padding: 0.8rem;
  gap: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: ${THEME.PRIMARY};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  animation: ${({ isClose }) => (isClose ? toastSlideOut : toastSlideIn)} 0.4s
    ease-in-out forwards;
  overflow-x: hidden;
`;

const ToastMessage = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  color: ${THEME.TEXT.WHITE};
`;
