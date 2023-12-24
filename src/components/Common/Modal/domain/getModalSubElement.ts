import { Children, isValidElement } from 'react';

import ModalButton from '../ModalButton';
import ModalTitle from '../ModalTitle';

type ModalChildType = typeof ModalTitle | typeof ModalButton;

const getModalSubElement = (
  children: React.ReactNode,
  childType: ModalChildType,
) => {
  const childrenToArray = Children.toArray(children);
  const targetChild = childrenToArray
    .filter((child) => isValidElement(child) && child.type === childType)
    .slice(0, 2);

  return targetChild;
};

export default getModalSubElement;
