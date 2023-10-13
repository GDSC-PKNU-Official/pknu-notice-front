import ToastState from '@type/toasts';
import { SetStateAction, createContext } from 'react';

type ToastDispatch = React.Dispatch<SetStateAction<ToastState[]>>;
const ToastStateContext = createContext<ToastState[] | null>(null);
const ToastDispatchContext = createContext<ToastDispatch | null>(null);

const ToastContext = {
  ToastStateContext,
  ToastDispatchContext,
};

export default ToastContext;
