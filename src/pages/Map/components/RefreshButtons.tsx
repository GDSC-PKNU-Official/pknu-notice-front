import Icon from '@components/Common/Icon';
import { PKNU_MAP_CENTER } from '@constants/pknu-map';
import TOAST_MESSAGES from '@constants/toast-message';
import styled from '@emotion/styled';
import useMap from '@hooks/useMap';
import useToasts from '@hooks/useToast';
import useUserLocation from '@hooks/useUserLocation';
import { THEME } from '@styles/ThemeProvider/theme';
import { Location } from '@type/map';
import { hasLocationPermission, isUserInShcool } from '@utils/map';
import React from 'react';

const RefreshButtons = () => {
  const { map } = useMap();
  const userLocation = useUserLocation();

  const { addToast } = useToasts();

  const handleMapCenter = (location: Location | null) => {
    if (!location) return;

    if (!hasLocationPermission(location)) {
      addToast(TOAST_MESSAGES.SHARE_LOCATION);
      return;
    }
    if (!isUserInShcool(location.LAT, location.LNG)) {
      addToast(TOAST_MESSAGES.OUT_OF_SHOOL);
      return;
    }

    const centerLocation = new window.kakao.maps.LatLng(
      location.LAT,
      location.LNG,
    );
    map.setLevel(4);
    map.panTo(centerLocation);
  };

  return (
    <IconContainer>
      <IconBox onClick={() => handleMapCenter(userLocation)}>
        <Icon kind="myLocation" color={THEME.PRIMARY} size="28" />
      </IconBox>
      <IconBox onClick={() => handleMapCenter(PKNU_MAP_CENTER)}>
        <Icon kind="reset" color={THEME.PRIMARY} size="28" />
      </IconBox>
    </IconContainer>
  );
};

export default RefreshButtons;

const IconContainer = styled.div`
  position: absolute;
  top: 6rem;
  right: 0;
  z-index: 3;
  padding: 1rem;
  width: 10%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const IconBox = styled.div`
  padding: 0.5rem;
  border-radius: 50%;
  background-color: ${THEME.TEXT.WHITE};

  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;
