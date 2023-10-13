import MajorProvider from '@components/MajorProvider';
import Modals from '@components/Modal/Modals';
import ModalsProvider from '@components/ModalsProvider';
import ToastProvider from '@components/Provider/Toast';
import Toasts from '@components/Toast/Toasts';
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
            <ToastProvider>
              <Modals />
              <Toasts />
              <App />
            </ToastProvider>
          </ModalsProvider>
        </MajorProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
