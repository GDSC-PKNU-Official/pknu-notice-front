import Map from '@components/Providers/MapProvider';
import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Map>
      <Map.PknuMap />
      <Map.MapHeader />
      <Map.FilterButtons />
      <Map.RefreshButtons />
      <Map.BuildingInfoToggle />
    </Map>
  );
};

export default MapPage;
