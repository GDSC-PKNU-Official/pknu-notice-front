import { Location } from '@type/map';
import { SetStateAction, createContext } from 'react';

type UserLocation = Location | null;

interface UserLocationState {
  userLocation: UserLocation;
  setUserLocation: React.Dispatch<SetStateAction<UserLocation>>;
}

const UserLocationContext = createContext<UserLocationState | null>(null);

export default UserLocationContext;
