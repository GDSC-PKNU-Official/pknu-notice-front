import Icon from '@components/Common/Icon';
import styled from '@emotion/styled';
import useRoter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';

const Header = () => {
  const { routerTo, goBack, currentPath } = useRoter();
  if (currentPath === '/map') return <></>;

  const isNotHomePage = currentPath !== '/';

  return (
    <Container>
      {isNotHomePage && (
        <IconContainer>
          <Icon kind="arrowBack" onClick={goBack} size="20" />
        </IconContainer>
      )}
      <Logo onClick={() => routerTo('/')}>부림이</Logo>
    </Container>
  );
};

export default Header;

const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 480px;
  position: fixed;
  top: 0;
  z-index: 3;
  height: 8vh;
  background-color: ${THEME.TEXT.WHITE};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const IconContainer = styled.div`
  position: absolute;
  left: 1rem;
`;

const Logo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  font-weight: bold;
`;
