import MapBoundsLimitModal from '@components/Modal/MapBoundsLimitModal';
import { PKNU_MAP_LIMIT } from '@constants/pknu-map';
import React, { useEffect, useState } from 'react';

interface MapBounds {
  map: any;
  centerLocation: any;
}

const MapboundaryObserver = ({ map, centerLocation }: MapBounds) => {
  if (!map) {
    return null;
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const boundayLimitHandler = () => {
      const { La, Ma } = map.getCenter();
      if (
        Ma >= PKNU_MAP_LIMIT.TOP ||
        La >= PKNU_MAP_LIMIT.RIGHT ||
        Ma <= PKNU_MAP_LIMIT.BOTTOM ||
        La <= PKNU_MAP_LIMIT.LEFT
      ) {
        setIsModalOpen((prev) => !prev);
        map.setLevel(4);
        map.setCenter(centerLocation);
      }
    };
    window.kakao.maps.event.addListener(map, 'dragend', boundayLimitHandler);

    return () => {
      window.kakao.maps.event.removeListener(
        map,
        'dragend',
        boundayLimitHandler,
      );
    };
  }, []);

  return (
    <>
      {isModalOpen && (
        <MapBoundsLimitModal onClose={() => setIsModalOpen((prev) => !prev)} />
      )}
    </>
  );
};

export default MapboundaryObserver;
