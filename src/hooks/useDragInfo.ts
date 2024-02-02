import { inrange, registDragEvent } from '@utils/map/regist-drag-event';
import { useEffect, useState } from 'react';

const DEFAULT_HEIGHT = 300;
const BOUNDARY_MARGIN = 5;
const MIN_H = 80;

interface InfoPosition {
  top: number;
  height: number;
}

const useDragInfo = (boundary: React.RefObject<HTMLDivElement>) => {
  const [{ top, height }, setPosition] = useState<InfoPosition>({
    top: -DEFAULT_HEIGHT,
    height: 0,
  });

  useEffect(() => {
    const boundaryInfo = boundary.current?.getBoundingClientRect();

    if (!boundaryInfo) return;

    setPosition({
      top: boundaryInfo.height / 2,
      height: boundaryInfo.height / 2,
    });
  }, []);

  const handleDrag = registDragEvent((deltaY) => {
    setPosition({
      top: inrange(top + deltaY, BOUNDARY_MARGIN, top + height - MIN_H),
      height: inrange(height - deltaY, MIN_H, top + height - BOUNDARY_MARGIN),
    });
  }, true);

  return {
    currentPosition: {
      top,
      height,
    },
    handleDrag,
  };
};

export default useDragInfo;
