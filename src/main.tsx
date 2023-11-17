import Modals from '@components/Common/Modal/Modals';
import Toasts from '@components/Common/Toast/Toasts';
import {
  MajorProvider,
  ModalsProvider,
  ToastsProvider,
} from '@components/Providers';
import ThemeProvider from '@styles/ThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { worker } from 'src/mocks/browser';

import App from './App';

if ('serviceWorker' in navigator) {
  if (process.env.NODE_ENV === 'development') {
    navigator.serviceWorker.register('/mockServiceWorker.js');
  } else {
    navigator.serviceWorker.register('/sw.js');
  }
}

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MajorProvider>
          <ModalsProvider>
            <ToastsProvider>
              <Modals />
              <Toasts />
              <App />
            </ToastsProvider>
          </ModalsProvider>
        </MajorProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
