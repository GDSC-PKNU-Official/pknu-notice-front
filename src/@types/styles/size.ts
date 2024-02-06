import { CSSProperties } from 'react';

export type SizeOption =
  | 'large'
  | 'medium'
  | 'small'
  | 'tiny'
  | 'halfCard'
  | 'building';

export interface Size {
  height: CSSProperties['height'];
  width: CSSProperties['width'];
}
