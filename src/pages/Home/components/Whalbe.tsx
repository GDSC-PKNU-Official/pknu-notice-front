import Carousel from '@components/Carousel';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

const Whalbe = () => {
  return (
    <Container>
      <Title>비교과</Title>
      <Carousel />
    </Container>
  );
};

export default Whalbe;

const Container = styled.div`
  overflow: hidden;
  border-radius: 15px;
  padding: 5%;
  background-color: ${THEME.BACKGROUND};
  margin-top: 5%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
