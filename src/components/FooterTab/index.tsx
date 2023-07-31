import Icon from '@components/Icon';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';

const footerIcons = [
  { kind: 'map', path: '/map' },
  { kind: 'home', path: '/' },
  { kind: 'accountCircle', path: '/my' },
] as const;

const FooterTab = () => {
  const { routerTo } = useRouter();

  const handleIconClick = (kind: IconKind, path: string) => {
    routerTo(path);
  };

  return (
    <Footer>
      {footerIcons.map(({ kind, path }) => (
        <IconContainer
          key={kind}
          role="button"
          onClick={() => handleIconClick(kind, path)}
        >
          <Icon
            key={kind}
            kind={kind}
            color={
              window.location.pathname === path
                ? THEME.PRIMARY
                : THEME.TEXT.BLACK
            }
          />
        </IconContainer>
      ))}
    </Footer>
  );
};

const Footer = styled.div`
  // Footer 스타일 컴포넌트 수정
  max-width: 480px;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;

  height: 8%;

  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 2;
  background-color: white;
`;

const IconContainer = styled.div`
  width: 100%;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

export default FooterTab;
