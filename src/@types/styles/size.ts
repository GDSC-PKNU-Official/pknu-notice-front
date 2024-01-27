import { CSSProperties } from 'react';

export type SizeOption = 'large' | 'medium' | 'small' | 'tiny' | 'building';

export interface Size {
  height: CSSProperties['height'];
  width: CSSProperties['width'];
}
