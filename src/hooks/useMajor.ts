import MajorContext from '@contexts/major';
import { useContext } from 'react';

const useMajor = () => {
  const context = useContext(MajorContext);

  if (!context) {
    throw new Error('MajorContext does not exists.');
  }

  return context;
};

export default useMajor;
