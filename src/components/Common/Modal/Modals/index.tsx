import ModalContext from '@contexts/modals';
import React, { Fragment, useContext } from 'react';

const Modals = () => {
  const modals = useContext(ModalContext.ModalState);

  return (
    <>
      {modals &&
        modals.map(({ Component, props }, idx) => {
          return <Component key={idx} {...(props as any)} />;
        })}
    </>
  );
};

export default Modals;
