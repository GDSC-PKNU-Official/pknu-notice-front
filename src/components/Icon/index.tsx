import { IconKind } from '@type/styles/icon';
import { IconType } from 'react-icons/lib';
import {
  MdMap,
  MdHome,
  MdAccountCircle,
  MdSchool,
  MdNotifications,
  MdMenu,
  MdArrowBackIos,
  MdAddCircleOutline,
  MdChevronRight,
  MdOutlineModeEdit,
  MdOutlineQuestionAnswer,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from 'react-icons/md';

const ICON: { [key in IconKind]: IconType } = {
  map: MdMap,
  home: MdHome,
  accountCircle: MdAccountCircle,
  school: MdSchool,
  notification: MdNotifications,
  menu: MdMenu,
  arrowBack: MdArrowBackIos,
  plus: MdAddCircleOutline,
  right: MdChevronRight,
  edit: MdOutlineModeEdit,
  suggest: MdOutlineQuestionAnswer,
  checkedRadio: MdRadioButtonChecked,
  uncheckedRadio: MdRadioButtonUnchecked,
};

interface IconProps {
  kind: IconKind;
  onClick?: () => void;
  color?: string;
}

const Icon = ({ kind, ...props }: IconProps) => {
  const TargetIcon = ICON[kind];
  return <TargetIcon size={28} {...props} />;
};

export default Icon;
