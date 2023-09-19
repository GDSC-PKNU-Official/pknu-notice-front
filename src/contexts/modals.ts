import { Modals } from '@type/modals';
import { SetStateAction, createContext } from 'react';

type Dispatch = React.Dispatch<SetStateAction<Modals>>;
const ModalState = createContext<Modals | null>(null);
const ModalDispatch = createContext<Dispatch | null>(null);

const ModalContext = {
  ModalState,
  ModalDispatch,
};

export default ModalContext;
