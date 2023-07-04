import MajorProvider from '@components/MajorProvider';
import ThemeProvider from '@styles/ThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { worker } from 'src/mocks/browser';

import App from './App';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MajorProvider>
          <App />
        </MajorProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
