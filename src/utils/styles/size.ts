import { Size } from 'src/@types/styles/size';

export function setSize(heigth: number): Size;
export function setSize(height: number, width?: number): Size;

export function setSize(height: number, width = height): Size {
  return {
    height: `${height}px`,
    width: `${width}px`,
  };
}
