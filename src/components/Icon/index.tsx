import { IconType } from 'react-icons/lib';
import {
  MdMap,
  MdHome,
  MdAccountCircle,
  MdSchool,
  MdNotifications,
  MdMenu,
  MdArrowBackIos,
} from 'react-icons/md';

type IconKind =
  | 'map'
  | 'home'
  | 'accountCircle'
  | 'school'
  | 'notification'
  | 'menu'
  | 'arrowBack';

const ICON: { [key in IconKind]: IconType } = {
  map: MdMap,
  home: MdHome,
  accountCircle: MdAccountCircle,
  school: MdSchool,
  notification: MdNotifications,
  menu: MdMenu,
  arrowBack: MdArrowBackIos,
};

interface IconProps {
  kind: IconKind;
  onClick?: () => void;
  color?: string;
}

const Icon = ({ kind, ...props }: IconProps) => {
  const TargetIcon = ICON[kind];
  return <TargetIcon size={28} role="button" {...props} />;
};

export default Icon;
