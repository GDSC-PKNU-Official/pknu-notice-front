import ToastContext from '@contexts/toasts';
import { useContext } from 'react';

const useToasts = () => {
  const toastContext = useContext(ToastContext.ToastDispatchContext);
  if (!toastContext) {
    throw new Error('toasts context does not exists.');
  }

  const setToasts = toastContext;
  const removeToast = (id: string) => {
    setToasts((prevToasts) =>
      prevToasts.filter((prevToast) => prevToast.id !== id),
    );
  };
  const addToast = (message: string) => {
    const randomId = Math.random().toString(36).substring(2, 16);
    const newToast = {
      id: randomId,
      message,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  return {
    addToast,
    removeToast,
  };
};

export default useToasts;
