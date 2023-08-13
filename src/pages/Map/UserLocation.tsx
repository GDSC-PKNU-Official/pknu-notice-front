import useUserLocation from '@hooks/useUserLocation';

interface UserLocationProps {
  map: any;
}

// 사용자가 건물 번호를 클릭했을 경우, Web Scheme를 사용한 길찾기 기능을 추가한다.

const UserLocation = ({ map }: UserLocationProps) => {
  if (!map) return null;
  const location = useUserLocation();
  if (typeof location === 'string' || !location) return null;

  const userLocation = new window.kakao.maps.LatLng(
    location.latitude,
    location.longitude,
  );
  const marker = new window.kakao.maps.Marker({
    map: map,
    position: userLocation,
  });
  map.setCenter(userLocation);

  return null;
};

export default UserLocation;
