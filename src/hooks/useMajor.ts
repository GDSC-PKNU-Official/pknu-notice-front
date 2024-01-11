import MajorContext from '@contexts/major';
import { useContext } from 'react';

const useMajor = () => {
  const majorStorage = useContext(MajorContext);

  if (!majorStorage) {
    throw new Error('MajorContext does not exists.');
  }

  const major = majorStorage.getMajor();
  const setMajor = majorStorage.setMajor.bind(majorStorage);

  return {
    major,
    setMajor,
  };
};

export default useMajor;
