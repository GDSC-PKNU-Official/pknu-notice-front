import { NO_PROVIDE_LOCATION } from '@constants/pknu-map';
import UserLocationContext from '@contexts/user-location';
import { useContext, useEffect } from 'react';

const useUserLocation = () => {
  const context = useContext(UserLocationContext);

  if (!context) {
    throw new Error('UserLocationContext does not exists.');
  }

  const { userLocation, setUserLocation } = context;

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
    if (userLocation) return;

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
