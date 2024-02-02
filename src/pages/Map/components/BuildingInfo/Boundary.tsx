import styled from '@emotion/styled';
import React from 'react';

export default React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function Boundary(props, ref) {
    return <StyledBondary ref={ref} {...props} />;
  },
);

const StyledBondary = styled.div`
  position: relative;
  min-height: 75vh;
  background-color: transparent;
  top: calc(100vh - 90px - 75vh);
`;
