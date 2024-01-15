import Major from '@type/major';
import { createContext } from 'react';

interface MajorState {
  getMajor: () => Major;
  setMajor: (major: string) => void;
}

const MajorContext = createContext<MajorState | null>(null);

export default MajorContext;
