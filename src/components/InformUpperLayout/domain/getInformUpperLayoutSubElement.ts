import { Children, isValidElement } from 'react';

import InformSearchForm from '../InformSearchForm';
import InformSubTitle from '../InformSubTitle';
import InformTitle from '../InformTitle';
import InformTypeButton from '../InformTypeButton';

type InformUpperLayoutChildType =
  | typeof InformTitle
  | typeof InformSubTitle
  | typeof InformTypeButton
  | typeof InformSearchForm;

const getInformUpperLayoutSubElement = (
  children: React.ReactNode,
  childType: InformUpperLayoutChildType,
) => {
  const childrenArray = Children.toArray(children);
  const targetChild = childrenArray
    .filter((child) => isValidElement(child) && child.type === childType)
    .slice(0, 2);

  return targetChild;
};

export default getInformUpperLayoutSubElement;
