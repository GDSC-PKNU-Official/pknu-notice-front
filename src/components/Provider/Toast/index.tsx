import ToastContext from '@contexts/toasts';
import ToastState from '@type/toasts';
import React, { useState } from 'react';

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  return (
    <ToastContext.ToastStateContext.Provider value={toasts}>
      <ToastContext.ToastDispatchContext.Provider value={setToasts}>
        {children}
      </ToastContext.ToastDispatchContext.Provider>
    </ToastContext.ToastStateContext.Provider>
  );
};

export default ToastProvider;
