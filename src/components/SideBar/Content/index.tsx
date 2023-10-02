import Icon from '@components/Icon';
import SIDEBAR_CONTENT from '@constants/sidebar';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { SetStateAction } from 'react';

interface SideBarContentProps {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const SideBarContent = ({ setOpen }: SideBarContentProps) => {
  const { routerTo } = useRouter();
  const routerToPath = (path: string) => {
    routerTo(path);
    setOpen(false);
  };

  return (
    <Container>
      {SIDEBAR_CONTENT.map((item) => {
        return (
          <SideBarItem key={item.id} onClick={() => routerToPath(item.path)}>
            <Icon kind={item.icon} color={THEME.PRIMARY} />
            <Title>{item.title}</Title>
          </SideBarItem>
        );
      })}
    </Container>
  );
};

export default SideBarContent;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  line-height: 4;
`;

const SideBarItem = styled.div`
  width: 100%;

  font-size: 16px;
  color: ${THEME.TEXT.BLACK};

  display: flex;
  align-items: center;
  border-bottom: 1px solid ${THEME.BUTTON.GRAY};
`;

const Title = styled.span`
  text-indent: 10px;
`;
