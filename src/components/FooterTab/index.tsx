import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type IconKind =
  | 'map'
  | 'home'
  | 'accountCircle'
  | 'school'
  | 'notification'
  | 'menu'
  | 'arrowBack';

type IconContainerProps = {
  onClick: () => void;
};

const PRIMARY_COLOR = '#71BC5C'; // 해당 상수는 추후 color 파일이 만들어지면 대체될 예정
const BLACK_COLOR = 'black';

const footerIcons = [
  { kind: 'map', path: '/map' },
  { kind: 'home', path: '/' },
  { kind: 'accountCircle', path: '/my' },
] as const;

const FooterTab = () => {
  const [activeIcon, setActiveIcon] = useState('home');
  const navigate = useNavigate();

  const handleIconClick = (kind: IconKind, path: string) => {
    setActiveIcon(kind);
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
            color={activeIcon === kind ? PRIMARY_COLOR : BLACK_COLOR}
          />
        </IconContainer>
      ))}
    </Footer>
  );
};

const Footer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  width: 100vw;
  height: 70px;
  background: white;
`;

const IconContainer = styled.div<IconContainerProps>`
  width: 100%;
  text-align: center;
  &: hover {
    cursor: pointer;
  }
`;

export default FooterTab;
