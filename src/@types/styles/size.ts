import { CSSProperties } from 'react';

export type SizeOption = 'large' | 'medium' | 'small' | 'tiny';

export interface Size {
  height: CSSProperties['height'];
  width: CSSProperties['width'];
}
