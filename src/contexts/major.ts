import { createContext } from 'react';

interface MajorState {
  major: string | null;
  setMajor: React.Dispatch<React.SetStateAction<string | null>>;
}

const MajorContext = createContext<MajorState | null>(null);

export default MajorContext;
