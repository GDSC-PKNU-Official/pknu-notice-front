import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';

const BodyLayout = () => {
  return (
    <StyledBodyLayout>
      <Outlet />
    </StyledBodyLayout>
  );
};

export default BodyLayout;

const StyledBodyLayout = styled.div`
  height: calc(100vh - 16vh);
  padding: 8vh 0 8vh 0;
`;
