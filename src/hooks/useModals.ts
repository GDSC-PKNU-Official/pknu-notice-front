import ModalsContext from '@contexts/modals';
import { useCallback, useContext } from 'react';

const useModals = () => {
  const setModals = useContext(ModalsContext.ModalDispatch);
  if (!setModals) {
    throw new Error('ModalContext does not exists.');
  }

  const openModal = useCallback(
    (Component: React.ReactElement<{ chidren: React.ReactNode }>) => {
      setModals((modals) => [...modals, { Component }]);
    },
    [setModals],
  );

  const closeModal = useCallback(() => {
    setModals((modals) => modals.slice(0, -1));
  }, [setModals]);

  return {
    openModal,
    closeModal,
  };
};

export default useModals;
