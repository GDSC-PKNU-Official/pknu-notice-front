import { PKNU_MAP_CENTER_LOCATION } from '@constants/pknu-map';
import PknuMapContext from '@contexts/map';
import { useContext } from 'react';

const useMap = () => {
  const pknuMapContext = useContext(PknuMapContext);

  if (!pknuMapContext) {
    throw new Error('PknuMapDispatchContext does not exists');
  }

  const { map, setMap } = pknuMapContext;

  const setPknuMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: PKNU_MAP_CENTER_LOCATION,
      level: 4,
      minLevel: 1,
      maxLevel: 4,
    };
    const map = new window.kakao.maps.Map(container as HTMLDivElement, options);
    setMap(map);
  };

  return { map, setPknuMap };
};

export default useMap;
