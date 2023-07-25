import MapLevetLimitModal from '@components/Modal/MapLevelLimitModal';
import { PKNU_MAP_LIMIT } from '@constants/pknu-map';
import React, { useEffect, useState } from 'react';

interface MapLevelObserverProps {
  map: any;
  centerLocation: any;
}

const MapLevelObserver = ({ map, centerLocation }: MapLevelObserverProps) => {
  if (!map) {
    return null;
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const levelLimitHandler = () => {
      if (map.getLevel() <= PKNU_MAP_LIMIT.LEVEL) {
        return;
      }
      map.setLevel(PKNU_MAP_LIMIT.LEVEL);
      map.setCenter(centerLocation);
      setIsModalOpen((prev) => !prev);
    };
    window.kakao.maps.event.addListener(map, 'zoom_changed', levelLimitHandler);
  });

  return (
    <>
      {isModalOpen && (
        <MapLevetLimitModal onClose={() => setIsModalOpen((prev) => !prev)} />
      )}
    </>
  );
};

export default MapLevelObserver;
