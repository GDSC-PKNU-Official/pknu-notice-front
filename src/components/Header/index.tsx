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

  Button {
    width: 10%;
  }
`;

const Logo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  font-weight: bold;
  width: 80vw;
`;

export default Header;
