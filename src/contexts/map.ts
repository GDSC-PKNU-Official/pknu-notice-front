import { SetStateAction, createContext } from 'react';

interface PknuMapState {
  map: any;
  setMap: React.Dispatch<SetStateAction<any>>;
}

const PknuMapStateContext = createContext<PknuMapState | null>(null);

export default PknuMapStateContext;
