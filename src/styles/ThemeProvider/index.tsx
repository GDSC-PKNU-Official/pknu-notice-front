import { ThemeProvider as Provider } from '@emotion/react';
import Global from '@styles/Global';
import { ReactNode } from 'react';

import { THEME } from './theme';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <>
      <Global />
      <Provider theme={THEME}>{children}</Provider>
    </>
  );
};

export default ThemeProvider;
