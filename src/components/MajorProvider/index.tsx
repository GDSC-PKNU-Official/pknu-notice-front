import MajorContext from '@contexts/major';
import Major from '@type/major';
import React, { useState } from 'react';

interface MajorProviderProps {
  children: React.ReactNode;
}

const MajorProvider = ({ children }: MajorProviderProps) => {
  const [major, setMajor] = useState<Major>(null);

  return (
    <MajorContext.Provider value={{ major, setMajor }}>
      {children}
    </MajorContext.Provider>
  );
};

export default MajorProvider;
