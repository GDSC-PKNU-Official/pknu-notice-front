import http from '@apis/http';
import MajorContext from '@contexts/major';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

interface GraduationLink {
  department: string;
  link: string | null;
}

interface MajorProviderProps {
  children: React.ReactNode;
}

const MajorProvider = ({ children }: MajorProviderProps) => {
  const [major, setMajor] = useState<string | null>(null);
  const [graduationLink, setGraduationLink] = useState<string | null>('');

  useEffect(() => {
    const storedMajor = localStorage.getItem('major');
    if (!storedMajor) return;
    setMajor(storedMajor);
  }, []);

  useEffect(() => {
    if (!major) return;

    (async () => {
      const response: AxiosResponse<GraduationLink> = await http.get(
        `/api/graduation?major=${major}`,
      );
      const graduationLink = response.data.link;
      setGraduationLink(graduationLink);
    })();
  }, [major]);

  return (
    <MajorContext.Provider value={{ major, setMajor, graduationLink }}>
      {children}
    </MajorContext.Provider>
  );
};

export default MajorProvider;
