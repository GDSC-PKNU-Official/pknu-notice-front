import ModalContext from '@contexts/modals';
import React, { Fragment, useContext } from 'react';

const Modals = () => {
  const modals = useContext(ModalContext.ModalState);

  return (
    <>
      {modals &&
        modals.map(({ Component }, idx) => {
          return <React.Fragment key={idx}>{Component}</React.Fragment>;
        })}
    </>
  );
};

export default Modals;
