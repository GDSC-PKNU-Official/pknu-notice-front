import { Children, isValidElement } from 'react';

import TipImage from '../TipImage';
import TipSubTitle from '../TipSubTitle';
import TipTitle from '../TipTitle';

type TipCardChildType = typeof TipTitle | typeof TipSubTitle | typeof TipImage;

const getTipCardSubElement = (
  children: React.ReactNode,
  childType: TipCardChildType,
) => {
  const chidrenArray = Children.toArray(children);
  const targetChild = chidrenArray
    .filter((child) => isValidElement(child) && child.type === childType)
    .slice(0, 2);

  return targetChild;
};

export default getTipCardSubElement;
