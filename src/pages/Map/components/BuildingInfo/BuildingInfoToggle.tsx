import { eventType } from '@utils/map/regist-drag-event';
import React, { useEffect, useState } from 'react';

import BuildingInfo from './BuildingInfo';

const BuildingInfoToggle = () => {
  const [buildingNumber, setBuildingNumber] = useState<string>('');

  const unmountInfo = () => setBuildingNumber('');
  const isInfoMounted = buildingNumber !== '';

  useEffect(() => {
    const getNumber = (e: MouseEvent | TouchEvent) => {
      if (!(e.target instanceof HTMLSpanElement) || isInfoMounted) return;

      setBuildingNumber(e.target.innerText);
    };

    document.addEventListener(eventType, getNumber);

    return () => {
      document.removeEventListener(eventType, getNumber);
    };
  }, [buildingNumber]);

  return isInfoMounted ? (
    <BuildingInfo buildingNumber={buildingNumber} unmountInfo={unmountInfo} />
  ) : null;
};

export default BuildingInfoToggle;
