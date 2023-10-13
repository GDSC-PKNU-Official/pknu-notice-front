import Icon from '@components/Icon';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useToasts from '@hooks/useToast';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';
import React, { useEffect, useState } from 'react';

interface ToastProps {
  id: string;
  icon: IconKind;
  message: string;
}

const Toast = ({ id, icon, message }: ToastProps) => {
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
      <Icon kind={icon} size="18" color={THEME.PRIMARY} />
      <ToastMessage>{message}</ToastMessage>
      <ProgressBar></ProgressBar>
    </Container>
  );
};

export default Toast;

const toastSlideIn = keyframes`
  from{
    opacity: 0;
    transform: translateX(100%);
  }to{
    opacity: 1;
    transform: translateX(0%);
  }
`;

const toastSlideOut = keyframes`
  from{
    opacity: 1;
    transform: translateX(0%);
  }to{
    opacity: 0;
    transform: translateX(100%);
  }
`;

const Container = styled.div<{ isClose: boolean }>`
  width: 60%;
  position: relative;
  padding: 0.8rem;
  gap: 1rem;

  display: flex;
  align-items: center;
  background-color: ${THEME.TEXT.WHITE};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  animation: ${({ isClose }) => (isClose ? toastSlideOut : toastSlideIn)} 0.4s
    ease-in-out forwards;
  overflow-x: hidden;
`;

const ToastMessage = styled.span`
  font-size: 12px;
`;

const progressBar = keyframes`
    from{
        width: 100%;
    }to{
        width: 0%;
    }
`;
const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 4px;
  background-color: ${THEME.PRIMARY};

  animation: ${progressBar} 2s linear forwards;
`;
