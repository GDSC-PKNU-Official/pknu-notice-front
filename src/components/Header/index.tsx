import Icon from '@components/Common/Icon';
import SideBar from '@components/SideBar';
import SideBarContent from '@components/SideBar/Content';
import styled from '@emotion/styled';
import useRoter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { routerTo, goBack } = useRoter();
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();

  if (location.pathname === '/map') return <></>;

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Icon kind="arrowBack" onClick={goBack} />
        <Logo onClick={() => routerTo('/')}>부림이</Logo>
        <SideBar open={open} setOpen={setOpen}>
          <SideBarContent setOpen={setOpen} />
        </SideBar>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  max-width: 480px;
  position: fixed;
  top: 0;
  z-index: 3;
  height: 8vh;
  background-color: ${THEME.TEXT.WHITE};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const HeaderWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  font-weight: bold;
`;
