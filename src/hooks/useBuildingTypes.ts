import { BuildingType } from '@type/map';
import { useState } from 'react';

const useBuildingTypes = () => {
  const [activeTypes, setActiveTypes] = useState<Record<BuildingType, boolean>>(
    {
      A: true,
      B: false,
      C: false,
      D: false,
      E: false,
    },
  );

  const handleBuildingTypes = (type: BuildingType) => {
    setActiveTypes((prevActiveTypes) => {
      return {
        ...prevActiveTypes,
        [type]: !prevActiveTypes[type],
      };
    });
  };

  return { activeTypes, handleBuildingTypes };
};

export default useBuildingTypes;
