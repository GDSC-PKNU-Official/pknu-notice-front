import { NO_PROVIDE_LOCATION } from '@constants/pknu-map';
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
        timeout: 1000 * 10,
        maximumAge: 1000 * 60 * 2,
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
