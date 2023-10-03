import { SizeOption, Size } from './size';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  outline?: boolean;
  size?: SizeOption;
}

export type ImageSize = {
  [key in SizeOption]: Size;
};
