import ToastContext from '@contexts/toasts';
import styled from '@emotion/styled';
import React, { useContext } from 'react';

import Toast from '..';

const Toasts = () => {
  const toasts = useContext(ToastContext.ToastStateContext);
  if (toasts?.length === 0) return <></>;

  return (
    <ToastContainer>
      {toasts &&
        toasts.map((toast) => {
          return (
            <React.Fragment key={toast.id}>
              <Toast {...toast} />
            </React.Fragment>
          );
        })}
    </ToastContainer>
  );
};

export default Toasts;

const ToastContainer = styled.section`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 100px;
  width: 100%;

  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  row-gap: 12px;
  z-index: 9999;
`;
