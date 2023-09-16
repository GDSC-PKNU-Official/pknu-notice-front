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

// TODO
// 1. modal state, modal dispatch -> context 분리
// 2. 부림이 내부에서 사용하는 modal들의 컴포넌트 상태를 정의하고 any 사용하지 않기
