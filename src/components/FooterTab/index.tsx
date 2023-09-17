import Icon from '@components/Icon';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';

const footerTabs = [
  { kind: 'map', label: '지도', path: '/map' },
  { kind: 'home', label: '홈', path: '/' },
  { kind: 'accountCircle', label: '마이', path: '/my' },
] as const;

const FooterTab = () => {
  const { routerTo } = useRouter();

  const isUserInPath = (path: string) => window.location.pathname === path;

  return (
    <Footer>
      {footerTabs.map(({ kind, label, path }) => (
        <TabButton
          role="button"
          key={kind}
          onClick={() => routerTo(path)}
          active={isUserInPath(path)}
        >
          <Icon kind={kind} size="24" />
          <Label active={isUserInPath(path)}>{label}</Label>
        </TabButton>
      ))}
    </Footer>
  );
};

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  max-width: 480px;
  width: 100%;
  height: 60px;
  padding: 15px 0px 15px 0px;
  background-color: ${THEME.TEXT.WHITE};
  position: fixed;
  bottom: 0;
  z-index: 2;

  box-shadow: 0px -2px 6px rgba(99, 99, 99, 0.2);
`;

const TabButton = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  height: 100%;

  transition: color 0.3s ease;
  color: ${({ active }) => (active ? THEME.PRIMARY : THEME.TEXT.BLACK)};
`;

const Label = styled.span<{ active: boolean }>`
  margin-top: 4px;
  font-size: 12px;

  opacity: ${({ active }) => (active ? 1 : 0.6)};
  transition: opacity 0.2s ease;
`;
export default FooterTab;
