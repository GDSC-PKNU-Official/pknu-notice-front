import MajorContext from '@contexts/major';
import React, { useEffect, useState } from 'react';

interface MajorProviderProps {
  children: React.ReactNode;
}

const MajorProvider = ({ children }: MajorProviderProps) => {
  const [major, setMajor] = useState<string | null>(null);

  useEffect(() => {
    const storedMajor = localStorage.getItem('major');

    if (!storedMajor) return;
    setMajor(storedMajor);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'major') {
        const storedMajor = event.newValue;
        if (storedMajor !== null) setMajor(storedMajor);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <MajorContext.Provider value={{ major, setMajor }}>
      {children}
    </MajorContext.Provider>
  );
};

export default MajorProvider;
