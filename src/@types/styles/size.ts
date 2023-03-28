import { CSSProperties } from 'react';

export type SizeOption = 'large' | 'medium' | 'small';

export interface Size {
  height: CSSProperties['height'];
  width: CSSProperties['width'];
}
