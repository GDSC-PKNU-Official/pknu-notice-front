import ModalsContext from '@contexts/modals';
import { Modals } from '@type/modals';
import React, { useState } from 'react';

interface ModalsProviderProps {
  children: React.ReactNode;
}

const ModalsProvider = ({ children }: ModalsProviderProps) => {
  const [modals, setModals] = useState<Modals>([]);
  return (
    <ModalsContext.ModalState.Provider value={modals}>
      <ModalsContext.ModalDispatch.Provider value={setModals}>
        {children}
      </ModalsContext.ModalDispatch.Provider>
    </ModalsContext.ModalState.Provider>
  );
};

export default ModalsProvider;
