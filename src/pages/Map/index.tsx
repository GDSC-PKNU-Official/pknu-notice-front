import Map from '@components/Providers/MapProvider';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapPage = () => {
  return (
    <Map>
      <Map.PknuMap />
      <Map.MapHeader />
      <Map.FilterButtons />
      <Map.RefreshButtons />
    </Map>
  );
};

export default MapPage;
