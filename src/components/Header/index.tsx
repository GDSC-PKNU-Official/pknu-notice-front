import Icon from '@components/Icon';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useRoter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';

const Header = () => {
  const { routerTo, goBack } = useRoter();
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Icon kind="arrowBack" onClick={goBack} />
        <Logo onClick={() => routerTo('/')}>부림이</Logo>
        <div
          css={css`
            width: 28px;
          `}
        ></div>
        {/* <Icon kind="menu" /> */}
      </HeaderWrapper>
    </HeaderContainer>
  );
};

const Logo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  font-weight: bold;
`;

export default Header;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  max-width: 480px;
  height: 8vh;
  background-color: ${THEME.TEXT.WHITE};
  z-index: 2;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const HeaderWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
