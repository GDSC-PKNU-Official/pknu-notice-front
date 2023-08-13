import { PKNU_MAP_CENTER } from '@constants/pknu-map';
import { useMemo, useState } from 'react';

interface UserLocation {
  latitude: number;
  longitude: number;
}

const useUserLocation = () => {
  const [location, setLocation] = useState<UserLocation | string>('');

  const success = (position: any) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };
  const failed = () => {
    setLocation({
      latitude: PKNU_MAP_CENTER.LAT,
      longitude: PKNU_MAP_CENTER.LNG,
    });
  };

  useMemo(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, failed);
    }
  }, [navigator.geolocation.getCurrentPosition]);

  return location;
};

export default useUserLocation;
