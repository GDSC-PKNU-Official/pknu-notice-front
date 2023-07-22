import ModalsContext from '@contexts/modals';
import { Modals } from '@type/modals';
import React, { useState } from 'react';

interface ModalsProviderProps {
  children: React.ReactNode;
}

const ModalsProvier = ({ children }: ModalsProviderProps) => {
  const [modals, setModals] = useState<Modals>([]);
  return (
    <ModalsContext.Provider value={{ modals, setModals }}>
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsProvier;
