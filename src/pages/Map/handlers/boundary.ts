import {
  DIRECTION,
  PKNU_MAP_LIMIT,
  RESET_COORDINATES,
} from '@constants/pknu-map';

const gerOverDirection = (La: number, Ma: number): DIRECTION | undefined => {
  if (Ma >= PKNU_MAP_LIMIT.TOP) return 'TOP';
  if (La >= PKNU_MAP_LIMIT.RIGHT) return 'RIGHT';
  if (Ma <= PKNU_MAP_LIMIT.BOTTOM) return 'BOTTOM';
  if (La <= PKNU_MAP_LIMIT.LEFT) return 'LEFT';
  return;
};
const getResetDirection = (overDirection: DIRECTION) => {
  return new window.kakao.maps.LatLng(
    RESET_COORDINATES[overDirection].lat,
    RESET_COORDINATES[overDirection].lng,
  );
};

const handleMapBoundary = (map: any) => {
  if (!map) return null;

  const handleBoundaryLimit = () => {
    const { La, Ma } = map.getCenter();
    const overDirection = gerOverDirection(La, Ma);

    if (!overDirection) return;
    map.setDraggable(false);
    setTimeout(() => {
      const resetDirection = getResetDirection(overDirection);
      map.panTo(resetDirection);
      map.setDraggable(true);
    }, 300);
  };

  window.kakao.maps.event.addListener(map, 'drag', handleBoundaryLimit);
  window.kakao.maps.event.addListener(map, 'zoom_changed', handleBoundaryLimit);
};

export default handleMapBoundary;
