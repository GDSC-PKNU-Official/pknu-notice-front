import { NO_PROVIDE_LOCATION } from '@constants/pknu-map';
import { Location } from '@type/map';

const hasLocationPermission = (location: Location | null) => {
  return (
    location && JSON.stringify(location) !== JSON.stringify(NO_PROVIDE_LOCATION)
  );
};

export default hasLocationPermission;
