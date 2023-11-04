import Major from '@type/major';
import { createContext } from 'react';

interface MajorState {
  major: Major;
  setMajor: React.Dispatch<React.SetStateAction<Major>>;
  graduationLink: string | null;
}

const MajorContext = createContext<MajorState | null>(null);

export default MajorContext;
