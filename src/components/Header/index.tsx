import Icon from '@components/Icon';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useRoter from '@hooks/useRouter';
import React from 'react';

const Header = () => {
  const { routerTo, goBack } = useRoter();
  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;

        padding: 5px 10px;
      `}
    >
      <Icon kind="arrowBack" onClick={goBack} />
      <Logo onClick={() => routerTo('/')}>Logo</Logo>
      <Icon kind="menu" />
    </header>
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
