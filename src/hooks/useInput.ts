import { ChangeEvent, useCallback, useState } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  }, []);

  const resetValue = useCallback(() => {
    setInputValue('');
  }, []);

  return [inputValue, handleValue, resetValue] as const;
};

export default useInput;
