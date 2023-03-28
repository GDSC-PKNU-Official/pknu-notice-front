import Icon from '@components/Icon';
import styled from '@emotion/styled';
import React from 'react';

const Header = () => {
  return (
    <Container>
      <Icon kind="arrowBack" />
      <Logo>Logo</Logo>
      <Icon kind="menu" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 5px 10px;
`;

const Logo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  font-weight: bold;
`;

export default Header;
