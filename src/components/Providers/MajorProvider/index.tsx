import MajorContext from '@contexts/major';
import React from 'react';

import MajorStorage from './major-storage';

interface MajorProviderProps {
  children: React.ReactNode;
}

const MAJOR_STORAGE_KEY = 'major' as string;

const MajorProvider = ({ children }: MajorProviderProps) => {
  const majorStorage = new MajorStorage(MAJOR_STORAGE_KEY);

  return (
    <MajorContext.Provider value={majorStorage}>
      {children}
    </MajorContext.Provider>
  );
};

export default MajorProvider;
