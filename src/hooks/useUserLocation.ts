import { NO_PROVIDE_LOCATION, PKNU_MAP_CENTER } from '@constants/pknu-map';
import { Location } from '@type/map';
import { useEffect, useState } from 'react';

const useUserLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const success = (position: any) => {
    setLocation({
      LAT: position.coords.latitude,
      LNG: position.coords.longitude,
    });
  };
  const failed = () => {
    setLocation({
      ...NO_PROVIDE_LOCATION,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, failed, {
        enableHighAccuracy: true,
        timeout: 1000 * 10, // 10초안에 위치 정보를 가져오지 못하면 고정 위치로 설정함
        maximumAge: 1000 * 60 * 2, // 가져온 위치 정보가 유효한 시간 2분
      });
    } else {
      setLocation({
        ...NO_PROVIDE_LOCATION,
      });
    }
  }, []);

  return location;
};

export default useUserLocation;
