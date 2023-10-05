import Icon from '@components/Icon';
import Image from '@components/Image';
import ASSET_PATH from '@constants/assets-path';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { CSSProperties, SetStateAction, useRef, useState } from 'react';

interface SideBarProps {
  width?: CSSProperties['width'];
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ width = '70%', children, open, setOpen }: SideBarProps) => {
  const [mount, setMount] = useState<boolean>(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const openSideBar = () => {
    setMount(true);
    setOpen(true);
  };

  const handleCloseSideBar = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMount(false);
      setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };

  return (
    <Container>
      <Icon kind="menu" onClick={openSideBar} />
      {open && (
        <SideBarBackground onClick={handleCloseSideBar} mount={mount}>
          <SideBarContent ref={sideBarRef} mount={mount} width={width}>
            <Image
              src={ASSET_PATH.ICON}
              size="small"
              css={css`
                margin: 0 auto;
                margin-bottom: 10px;
              `}
            />
            <Title>부림이</Title>
            {children}
          </SideBarContent>
        </SideBarBackground>
      )}
    </Container>
  );
};

export default SideBar;

const Container = styled.section`
  max-width: 480px;
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const SideBarBackground = styled.div<{ mount: boolean }>`
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

  opacity: ${({ mount }) => (mount ? '1' : '0')};
  transition: opacity 0.3s ease-out;
`;

interface SideBarContentProps {
  width: CSSProperties['width'];
  mount: boolean;
}

const SideBarContent = styled.div<SideBarContentProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: ${({ width }) => width};
  padding: 12px;
  background-color: ${THEME.IVORY};

  display: flex;
  flex-direction: column;

  animation: ${({ mount }) => (mount ? slideIn : slideOut)} 0.3s ease-out;
`;

const Title = styled.span`
  text-align: center;
  font-size: 16px;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0%);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;
