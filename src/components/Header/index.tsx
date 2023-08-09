import Icon from '@components/Icon';
import styled from '@emotion/styled';
import useRoter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';

const Header = () => {
  const { routerTo, goBack } = useRoter();
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Icon kind="arrowBack" onClick={goBack} />
        <Logo onClick={() => routerTo('/')}>burimi</Logo>
        <Icon kind="menu" />
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
`;

const HeaderWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
