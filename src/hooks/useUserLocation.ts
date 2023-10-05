import { NO_PROVIDE_LOCATION } from '@constants/pknu-map';
import { Location } from '@type/map';
import { useEffect, useState } from 'react';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  const success = (position: any) => {
    setUserLocation({
      LAT: position.coords.latitude,
      LNG: position.coords.longitude,
    });
  };
  const failed = () => {
    setUserLocation({
      ...NO_PROVIDE_LOCATION,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, failed, {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 60 * 5,
      });
    } else {
      setUserLocation({
        ...NO_PROVIDE_LOCATION,
      });
    }
  }, []);

  return userLocation;
};

export default useUserLocation;
