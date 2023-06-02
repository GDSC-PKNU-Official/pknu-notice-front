import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';
import { useNavigate } from 'react-router-dom';

const footerIcons = [
  { kind: 'map', path: '/map' },
  { kind: 'home', path: '/' },
  { kind: 'accountCircle', path: '/my' },
] as const;

const FooterTab = () => {
  const navigate = useNavigate();

  const handleIconClick = (kind: IconKind, path: string) => {
    navigate(path);
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
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  justify-content: space-around;
  bottom: 0;
`;

const IconContainer = styled.div`
  width: 100%;
  text-align: center;
  &: hover {
    cursor: pointer;
  }
`;

export default FooterTab;
